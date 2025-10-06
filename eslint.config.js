import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: true,
        document: true,
        console: true,
        localStorage: true,
        setTimeout: 'readonly',
        ResizeObserver: 'readonly',
        cancelAnimationFrame: 'readonly',
        requestAnimationFrame: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        navigator: 'readonly',
        clearTimeout: 'readonly',
        IntersectionObserver: 'readonly',
        getComputedStyle: 'readonly',
        alert: 'readonly',
        sessionStorage: 'readonly',
        URLSearchParams: 'readonly',
        if: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      "no-unexpected-multiline": "off",
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
    },
  },
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
];
