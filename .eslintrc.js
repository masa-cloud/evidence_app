module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [],
  ignorePatterns: ['.eslintrc.*'],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'sort-keys-custom-order', 'simple-import-sort', 'import', 'import-access', 'unused-imports'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    // For JS objects sorting
    'sort-keys-custom-order/object-keys': [
      'error',
      {
        orderedKeys: ['id', 'name', 'title'],
      },
    ],
    // For TS types sorting
    'sort-keys-custom-order/type-keys': [
      'error',
      {
        orderedKeys: ['id', 'name', 'title'],
      },
    ],
    // NOTE:simple-import-sort
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    // NOTE:unused-imports
    'unused-imports/no-unused-imports': 'error',
    // NOTE:eslint-plugin-import-access
    'import-access/jsdoc': ['error'],
  },
};
