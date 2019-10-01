const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nodeModulesPath = path.resolve(__dirname, "node_modules");
const babelLoaderOption = {
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current"
          }
        }
      ]
    ],
    plugins: [["transform-react-jsx", { pragma: "html" }]]　// react使うための設定だって
  }
};

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/scripts/main.ts"],
  output: {
    path: path.resolve(__dirname, "public/"),
    filename: "app.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"]
  },
  devServer: {
    // webpack-dev-serverの公開フォルダ
    contentBase: path.join(__dirname, "src")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [babelLoaderOption, "ts-loader"],
        exclude: [/node_modules/, nodeModulesPath]
      },
      {
        test: /\.jsx?$/,
        use: [babelLoaderOption],
        exclude: [/node_modules/, nodeModulesPath]
      },
      {
        // https://qiita.com/ryo2132/items/e168fd883512bd9419ae これパクった
        test: /\.pug$/,
        use: "pug-loader"
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // https://uemaweb.com/tech/2376/
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer()]
            }
          },
          "stylus-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
