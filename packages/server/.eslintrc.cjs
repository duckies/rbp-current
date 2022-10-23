module.exports = {
  extends: ['@duckies'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
