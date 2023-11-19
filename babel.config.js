module.exports = {
  plugins: [
    "react-refresh/babel",
    [
      "babel-plugin-named-asset-import",
      {
        loaderMap: {
          svg: {
            ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
          },
        },
      },
    ],
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          ie: "11",
          firefox: "50",
          chrome: "64",
          safari: "11.1",
        },
      },
    ],
    ["@babel/preset-react"],
  ],
};
