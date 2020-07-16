const path = require("path");

const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, //用正则匹配文件，用require或者import引入的都会匹配到
        loader: "babel-loader", //加载器名，就是上一步安装的loader
        exclude: /node_modules/, //排除node_modules目录，我们不加载node模块中的js哦~
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        //vue-loader会把vue单文件直接转成js。
      },
      {
        test: /\.(png|jpe?j|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          esModule: false,
        },
        //图片文件大小小于limit的数值，就会被改写成base64直接填入url里面，
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
      {
        test: /.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "a:href"],
          },
        },
      },
    ],
  },
  resolve: {
    //引入路径是不用写对应的后缀名
    extensions: [".js", ".vue", ".json"],
    //缩写扩展
    alias: {
      //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
      vue$: "vue/dist/vue.esm.js", // 'vue/dist/vue.common.js' for webpack 1
      //用@直接指引到src目录下，如：'./src/main'可以写成、'@/main'
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(path.join(__dirname, "dist/public/")),
    }),
  ],
};
