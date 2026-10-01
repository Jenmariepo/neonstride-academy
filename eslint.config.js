import js from '@eslint/js';
import globals from 'globals';
const MAXIMUM_DEPTH = 3;
export default [
  { ignores: ['node_modules/**', 'docs/**', 'dist/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'error',
      'max-lines': ['error', { max: 300, skipBlankLines: false, skipComments: false }],
      'max-lines-per-function': ['error', { max: 40, skipBlankLines: false, skipComments: false }],
      'max-depth': ['error', MAXIMUM_DEPTH],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-magic-numbers': [
        'error',
        { ignore: [-1, 0, 1], ignoreArrayIndexes: true, enforceConst: true },
      ],
    },
  },
  { files: ['tests/**/*.js', 'scripts/**/*.js'], rules: { 'no-magic-numbers': 'off' } },
];
