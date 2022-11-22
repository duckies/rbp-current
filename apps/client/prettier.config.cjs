/** @type import("@types/prettier").Options */
module.exports = {
  printWidth: 100,
  plugins: [require.resolve("prettier-plugin-organize-imports"), require.resolve("prettier-plugin-tailwindcss")],
};
