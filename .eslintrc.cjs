module.exports = {
  "extends": ["@duckies", "prettier"],
  "settings": {
    "react": {
      "version": "18"
    }
  },
  "rules": {
    "@typescript-eslint/consistent-type-imports": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn"
  }
}
