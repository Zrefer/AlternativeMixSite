const path = require("path");

module.exports = {
  title: "Mix Servers",
  charset: "UTF-8",
  lang: "ru-RU",
  filename: path.resolve(__dirname, "./build/index.html"),
  template: path.resolve(__dirname, "./public/index.ejs"),
  meta: {
    viewport: "width=device-width, initial-scale=1, minimum-scale=1",
  },
  inject: "body",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
  },
};
