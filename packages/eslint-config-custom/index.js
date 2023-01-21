module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'turbo', 'prettier'],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      impliedStrict: true
    },
    sourceType: "module"
  },
  rules: {
    semi: "error",
    "no-console": 0,
    'no-trailing-spaces': 2,
    'no-multiple-empty-lines': 2
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
};
