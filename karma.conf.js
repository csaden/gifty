var webpackConfig = require(__dirname + '/webpack.config');

var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    autoWatch: false,
    browsers: [ 'Chrome' ], //run in Chrome
    colors: true,
    frameworks: [ 'jasmine' ], //use the jasmine test framework
    files: [
      'tests.webpack.js' //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'nyan' ], //report results in this format
    singleRun: true, //just run once by default
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
