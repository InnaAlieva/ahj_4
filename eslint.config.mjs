import globals from 'globals';
import ESLint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jest from 'eslint-plugin-jest';

/** @type { import('eslint').Linter.Config[] } */
export default [
  ESLint.configs.recommended,
  {
    ignores: [ 'dist/', '*.json', 'eslint.config.mjs' ],
  },
  {
    languageOptions: { 
      globals: { ...globals.browser, ...globals.node, ...globals.jest } 
    },
  },
  {
    files: [ '**/*.test.js' ],
    ...jest.configs[ 'flat/recommended' ],
    rules: {
      ...jest.configs[ 'flat/recommended' ].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
  {
    files: [ 'src/**/*.js' ],
    rules: {
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/semi': [ 'error', 'always' ],
      '@stylistic/no-unused-vars': 'off',
      '@stylistic/no-console': 'off',
      '@/no-var': 'error',
    },
  },
  {
    files: [ '*.config.*' ],
    rules: {
      '@stylistic/no-underscore-dangle': [ 'off' ],
      '@stylistic/import/no-extraneous-dependencies': 'off',
    },
  },
  {
    plugins: { '@stylistic': stylistic, },
    rules: {
      '@stylistic/max-len': [ 
        'error', { code: 130 } 
      ],
      '@stylistic/quotes': [
        'error', 'single'
      ],
      '@stylistic/array-bracket-spacing': [
        'error', 'always'
      ],
      '@stylistic/array-bracket-newline': [
        'error', { 'multiline': true, 'minItems': 3 }
      ],
      '@stylistic/object-curly-spacing': [
        'error', 'always'
      ],
      '@stylistic/object-curly-newline': [
        'error', {
          'ObjectExpression': {
            'multiline': true, 'minProperties': 3
          }
        }
      ],
      '@stylistic/no-multi-spaces': [
        'error', {
          exceptions: {
            'Property': false,
            'BinaryExpression': true,
            'VariableDeclarator': true,
            'ImportDeclaration': true
          }
        }
      ],
      '@stylistic/key-spacing': [
        'error', { 'mode': 'strict' }
      ],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error', { max: 1, maxBOF: 1 }
      ],
    },
  },
];