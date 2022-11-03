module.exports = {
  extends: ['@duckies'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['app.exports'],
          message: 'Don\'t import from app.exports.',
        },
      ],
    }],
  },
};
