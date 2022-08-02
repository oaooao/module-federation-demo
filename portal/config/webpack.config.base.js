const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
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
              transform: {
                react: {
                  // 源代码无需引入 React 即可使用 JSX 了
                  runtime: "automatic",
                },
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
