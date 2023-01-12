module.exports = {
  extends: ['@duckies', 'prettier'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'quote-props': ['error', 'consistent'],
    'sort-imports': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['app.exports'],
            message: "Don't import from app.exports.",
          },
        ],
      },
    ],
  },
}
