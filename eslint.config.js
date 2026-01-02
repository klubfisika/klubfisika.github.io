import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // Base ESLint recommended rules
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  
  // Astro files
  ...eslintPluginAstro.configs.recommended,
  
  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  
  // Custom rules for all files
  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'error',
      'prefer-const': 'error',
    },
  },
  
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'build/**',
      'public/**',
      'tina/**',
      '*.cjs',
      '*.js',
      'test-*.js',
      'record-*.cjs',
      'vision-*.cjs',
      'screenshot.js',
      'src/components/Navigation-dropdown.astro',
      'src/components/Navigation-old.astro',
      'src/pages/mulai.astro',
      'src/pages/partnership-old.astro',
      'src/scripts/prism-config.js',
    ],
  },
];
