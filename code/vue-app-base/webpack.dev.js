const webpack = require("webpack");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map", // 起个服务器
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          { loader: "css-loader", options: { modules: true } },
          "less-loader",
        ],
      },
    ],
  },
  devServer: {
    // 这个意思是服务器要生成在哪个文件夹下
    contentBase: "./dist", // 启动的时候自动打开浏览器，然后自动访问这个服务器地址
    open: true, // 开启Hot Module Replacement
    hot: true,
  }, // HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello World vue",
      template: "./public/index.ejs",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
