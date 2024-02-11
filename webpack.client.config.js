const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const buildDirectory = "dist";
const outputDirectory = buildDirectory + "/client";
module.exports = {
  mode: "development",
  entry: "./src/client/index.jsx",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
  },
  devServer: {
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: [".js", ".jsx"], // Add .jsx to the list of extensions Webpack resolves
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
  ],
};
