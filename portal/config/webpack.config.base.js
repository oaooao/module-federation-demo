const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// @ts-ignore
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// @ts-ignore
const { ESBuildMinifyPlugin } = require("esbuild-loader");
// @ts-ignore
const { ModuleFederationPlugin } = require('webpack').container;
// @ts-ignore
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  mode: isDevelopment ? "development" : "production",
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    clean: true,
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
                tsx: true,
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
                  importSource: "@emotion/react",
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
          {
            loader: "esbuild-loader",
            options: {
              loader: "css",
              minify: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "portal",
      remotes: {
        qc: "qc@[qcUrl]/remoteEntry.js",
        cdp: "cdp@[cdpUrl]/remoteEntry.js",
        businessComponents: "qc@[businessComponentsUrl]/remoteEntry.js",
        libs: "libs@[libsUrl]/remoteEntry.js",
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 8000,
    static: [path.join(__dirname, "../dist")],
  },
  optimization: {
    minimizer: [
      !isDevelopment &&
        new ESBuildMinifyPlugin({
          target: "es2015", // Syntax to compile to (see options below for possible values)
        }),
    ].filter(Boolean),
  },
};
