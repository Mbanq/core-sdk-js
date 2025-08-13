const globals = require('globals');
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const securityPlugin = require('eslint-plugin-security');
const babelPlugin = require('@babel/eslint-plugin');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '/**/*.d.ts']
  },
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      security: securityPlugin,
      '@babel': babelPlugin,
      import: importPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es6,
        ...globals.mocha,
        ...globals.jest
      }
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          paths: ['src'],
          moduleDirectory: ['node_modules', 'src/'],
          extensions: ['.js', '.ts', '.d.ts']
        }
      }
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'prefer-const': 'error',
      'func-names': ['error', 'as-needed'],
      'no-console': 'off',
      'comma-dangle': ['error', 'never'],
      'comma-spacing': ['error', { before: false, after: true }],
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'space-before-function-paren': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eol-last': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'template-curly-spacing': ['error', 'never'],
      'no-var': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'quote-props': ['error', 'as-needed'],
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off'
    }
  },
  {
    files: ['**/*.test.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  }
];
