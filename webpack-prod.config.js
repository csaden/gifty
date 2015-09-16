var commonConfig = require('./webpack-common.config.js');
var webpack = require('webpack');

var prodLoaders = [
  // javascript/jsx loader - https://www.npmjs.com/package/babel-loader - without the react-hot loader
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?stage=0'],
  }
];

module.exports = {
  entry: [
  // our entry file
  './src/index.jsx'
  ],
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  devtool:'source-map',
  devServer: {
    // proxy calls to api to our own node server backend
    proxy: {
      '/api/*': 'http://localhost:3000/'
    }
  },
  module: {
    loaders: commonConfig.loaders.concat(prodLoaders)
  },
  plugins: [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  commonConfig.indexPagePlugin
  ],
};
