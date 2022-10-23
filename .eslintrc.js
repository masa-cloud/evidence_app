module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  overrides: [],
  ignorePatterns: ['.eslintrc.*'],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'sort-keys-custom-order',
    'simple-import-sort',
    'import',
    'unused-imports',
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
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
  },
};
