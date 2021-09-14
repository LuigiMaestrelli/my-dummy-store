module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'next/core-web-vitals',
    'standard',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  globals: {
    JSX: 'readonly'
  },
  rules: {
    'prettier/prettier': [
      'error',
      { semi: true },
      {
        usePrettierrc: true
      }
    ],
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off'
  }
};
