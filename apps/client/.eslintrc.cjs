module.exports = {
  extends: ["next/core-web-vitals", "@duckies", "plugin:mdx/recommended", "prettier"],
  rules: {
    "import/order": "off",
    "sort-imports": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "no-console": "off",
  },
  settings: {
    "mdx/code-blocks": true,
  },
}
