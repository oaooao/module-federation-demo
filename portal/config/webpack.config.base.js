const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js|mjs|jsx|ts|tsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8000,
  },
};
