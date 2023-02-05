module.exports = {
  extends: ["next/core-web-vitals", "@duckies", "plugin:mdx/recommended", "prettier"],
  rules: {
    "import/order": "off",
    "sort-imports": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "no-console": "off",
    "@next/next/no-html-link-for-pages": "off",
  },
  settings: {
    "mdx/code-blocks": true,
  },
}
