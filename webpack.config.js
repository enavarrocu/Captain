const lodash = require("lodash");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = process.env.NODE_ENV === "development";

// #region Common settings
const commonConfig = {
  devtool: isEnvDevelopment ? "source-map" : false,
  mode: isEnvProduction ? "production" : "development",
  output: { path: path.join(__dirname, "dist") },
  node: { __dirname: false, __filename: false },
  resolve: {
    alias: {
      _: path.join(__dirname, "src"),
      _main: path.join(__dirname, "src/main"),
      _models: path.join(__dirname, "src/models"),
      _public: path.join(__dirname, "public"),
      _renderer: path.join(__dirname, "src/renderer"),
      _utils: path.join(__dirname, "src/utils"),
    },
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
};
// #endregion

const rendererConfig = lodash.cloneDeep(commonConfig);
rendererConfig.entry = ["./src/renderer/index.tsx"];
rendererConfig.target = "electron-renderer";
rendererConfig.output.filename = "./renderer.bundle.js";
rendererConfig.devServer = {
  hot: true,
  compress: true,
  port: 9999,
  static: {
    directory: path.join(__dirname, "./public/"),
  },
};
rendererConfig.plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./public/index.html"),
  }),
];

module.exports = [rendererConfig];