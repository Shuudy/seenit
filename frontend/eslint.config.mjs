import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintPluginUnicorn.configs.recommended,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    plugins: { 'unused-imports': pluginUnusedImports, perfectionist },
    rules: {
      'perfectionist/sort-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',

      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*'],
        },
      ],

      // automatically removes unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'unicorn/filename-case': 'off',

      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Props: true,
            props: true,
            prev: true,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true,
          },
        },
      ],
    },
  },
  {
    files: [
      'src/app/**/page.tsx',
      'src/app/**/layout.tsx',
      'src/app/**/error.tsx',
      'src/app/**/loading.tsx',
    ],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
];

export default eslintConfig;
