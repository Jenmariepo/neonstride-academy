import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'acorn';
import { simple } from 'acorn-walk';
const LIMITS = { file: 300, function: 40 };
const EXCLUDED = new Set(['node_modules', '.git', 'screenshots', 'dist']);
function filesIn(directory) {
  return readdirSync(directory).flatMap((name) => {
    if (EXCLUDED.has(name)) return [];
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}
const errors = [];
let fileCount = 0;
let functionCount = 0;
let longestFile = { path: '', lines: 0 };
let longestFunction = { path: '', lines: 0 };
function checkFunction(node, path) {
  functionCount++;
  const lines = node.loc.end.line - node.loc.start.line + 1;
  if (lines > longestFunction.lines) longestFunction = { path, line: node.loc.start.line, lines };
  if (lines > LIMITS.function)
    errors.push(`${path}:${node.loc.start.line}: function ${lines} lines`);
}
function auditFile(path) {
  if (!/\.(js|css|html|sql)$/.test(path)) return;
  fileCount++;
  const source = readFileSync(path, 'utf8');
  const lines = source.trimEnd().split('\n').length;
  if (lines > longestFile.lines) longestFile = { path, lines };
  if (lines > LIMITS.file) errors.push(`${path}: ${lines} lines`);
  if (path.endsWith('.html') && /<style\b|\sstyle\s*=|\son[a-z]+\s*=/i.test(source))
    errors.push(`${path}: inline style or event handler`);
  if (
    /frontend[\\/]src[\\/]js[\\/](core|entities)[\\/]/.test(path) &&
    /\b(document|window)\b/.test(source)
  )
    errors.push(`${path}: engine depends on DOM globals`);
  if (!path.endsWith('.js')) return;
  const tree = parse(source, { ecmaVersion: 'latest', sourceType: 'module', locations: true });
  const inspect = (node) => checkFunction(node, path);
  simple(tree, {
    FunctionDeclaration: inspect,
    FunctionExpression: inspect,
    ArrowFunctionExpression: inspect,
  });
}
filesIn('.').forEach(auditFile);
process.stdout.write(
  JSON.stringify({ fileCount, functionCount, longestFile, longestFunction, errors }, null, 2) +
    '\n',
);
if (errors.length) process.exitCode = 1;
