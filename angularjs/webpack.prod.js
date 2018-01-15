const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var WebpackStrip = require('strip-loader');

var webpackConfig = require('./webpack.config.js');

const APP_DIR = path.resolve(__dirname, 'src');

webpackConfig.output.filename = 'app-bundle-[hash].js';

webpackConfig.plugins[0] = new HtmlWebpackPlugin({
  template: path.resolve(APP_DIR, 'index.html'),
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    preserveLineBreaks: false
  }
});

webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({mangle: false})
);

webpackConfig.module.loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: WebpackStrip.loader('console.log', 'debugger')
});

module.exports = webpackConfig;
