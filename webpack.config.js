'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  merge = require('webpack-merge'),
  path = require('path');

var TARGET = process.env.npm_lifecycle_event;

//webpack requires absolute paths
var SRC_PATH = path.join(__dirname, 'src');
var SERVER_PATH = path.join(__dirname, 'server');

var common = {
  context: SRC_PATH,
  entry: path.join(SRC_PATH, 'index.jsx'),
  // to enable requiring files without specifying the extension
  // you must add a resolve.extensions parameter specifying files webpack
  // searches for; can use require('file') instead of require('file.jsx')
  resolve: {
    root: [SRC_PATH, SERVER_PATH],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    // If in production mode we put the files into the dist folder instead
    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    filename: '[name].js', // template name based on keys in entry
    pathInfo: true
  },


  module: {
    loaders: [ // webpack's equivalent of browserify transforms and RequireJS plugins is a loader
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: [path.join(SRC_PATH, 'index.jsx'), path.join(SRC_PATH, 'app')],
        exclude: (/node_modules/|/lib/)
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: (/node_modules/|/lib/)
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        include: path.join(SRC_PATH, 'css')
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192" // inline base64 URLs for <=8k images, direct URLs for the rest
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  // webpack dev server automatically refreshes content in the browser
  module.exports = merge(common, {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      path.join(SRC_PATH, 'index.jsx')
    ],
    eslint: {
      configFile: '.eslintrc'
    },
    devtool: 'inline-source-map',
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      debug: true,
      port: 3000
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('common.js'),
      new HtmlWebpackPlugin({
        inject: true, // injects script tag for js at end of body
        template: 'src/index.html'
      }),
      new webpack.NoErrorsPlugin(), // if you want to see ESLint warnings in
      // console during development using WebpackDevServer,
      // remove NoErrorsPlugin from webpack config
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
