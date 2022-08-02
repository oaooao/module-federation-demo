const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  mode: isDevelopment ? "development" : "production",
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
                  // swc-loader will check whether webpack mode is 'development'
                  // and set this automatically starting from 0.1.13. You could also set it yourself.
                  // swc won't enable fast refresh when development is false
                  development: isDevelopment,
                  refresh: isDevelopment,
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
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 8000,
  },
};
