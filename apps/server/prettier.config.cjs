/** @type import("@types/prettier").Options */
module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  quoteProps: "consistent",
  plugins: [require.resolve("prettier-plugin-organize-imports")],
}
