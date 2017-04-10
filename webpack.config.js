const isProduction = process.env.NODE_ENV === 'production'
const webpack = require('webpack');
const path = require('path');

const node = /node_modules/

const folders = {
  public: path.resolve(__dirname, 'public'),
  app: path.resolve(__dirname, 'app'),
}

module.exports = {
  entry: "./app/index.js",
  module: {
    loaders: [
      {
        test: /\.html/,
        loader: "string-loader",
        exclude: node,
        include: [
          folders.app
        ]
      },
    ]
  },
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  }
}
