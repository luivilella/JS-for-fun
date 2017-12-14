const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [
    'babel-polyfill',
    path.resolve(APP_DIR, 'index', 'index.jsx')
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, 'index', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  module : {
    loaders : [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(css|scss)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};

module.exports = config;
