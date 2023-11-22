const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlConfig = require("./htmlConfig");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const faviconsConfig = require("./faviconsConfig");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  console.log(`Using build mode = ${argv.mode}`);

  return {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            !isProduction ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name].[hash].[ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[hash].[ext]",
          },
        },
      ],
    },
    plugins: [
      new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin(htmlConfig),
      new FaviconsWebpackPlugin(faviconsConfig),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      }),
    ],
    devServer: {
      static: path.join(__dirname, "./build"),
      compress: true,
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };
};
