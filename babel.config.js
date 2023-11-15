module.exports = {
  plugins: ["react-refresh/babel"],
  presets: [
    ["@babel/preset-react"],
    ["babel-plugin-named-asset-import"],
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
  ],
};
