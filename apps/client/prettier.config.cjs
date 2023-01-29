/** @type import("@types/prettier").Options */
module.exports = {
  printWidth: 100,
  semi: false,
  quoteProps: "consistent",
  plugins: [
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
}
