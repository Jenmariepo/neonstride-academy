import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const output = resolve('dist');
const apiBase = process.env.API_BASE_URL || '';
if (apiBase && !/^https?:\/\/[a-z0-9.:[\]-]+$/i.test(apiBase))
  throw new Error('API_BASE_URL must be an HTTP(S) origin without a trailing slash.');
mkdirSync(output, { recursive: true });
cpSync('frontend', output, { recursive: true });
const path = resolve(output, 'index.html');
const html = readFileSync(path, 'utf8').replace(
  'name="api-base" content=""',
  `name="api-base" content="${apiBase}"`,
);
writeFileSync(path, html);
process.stdout.write(`Frontend built in ${output}\n`);
