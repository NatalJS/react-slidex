var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');

module.exports = {
  resolve: {
    alias: {
      Slides: path.resolve(__dirname, '../src/Slides'),
      Stylesheets: path.resolve(__dirname, '../src/Stylesheets'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|slidex)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|otf)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ]
};
