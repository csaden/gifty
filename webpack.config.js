// 'use strict';

// var webpack = require('webpack');
// var path = require('path');

// //webpack requires absolute paths
// var srcPath = path.join(__dirname, 'src');
// var buildPath = path.join(__dirname, 'public', 'build');
// var serverPath = path.join(__dirname, 'server');
// var nodeModulesPath = path.resolve(__dirname, 'node_modules');
// var mainPath = path.resolve(__dirname, 'src', 'index.jsx');

// module.exports = {
//   devtool: 'eval',
//   entry: [
//     // For hot style updates
//     'webpack/hot/dev-server',
//     // The script refreshing the browser on none hot updates
//     'webpack-dev-server/client?http://localhost:8000',
//     // Our application
//     mainPath
//   ],
//   // to enable requiring files without specifying the extension
//   // you must add a resolve.extensions parameter specifying files webpack
//   // searches for; can use require('file') instead of require('file.jsx')
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },
//   output: {
//     // We need to give Webpack a path. It does not actually need it,
//     // because files are kept in memory in webpack-dev-server, but an
//     // error will occur if nothing is specified. We use the buildPath
//     // as that points to where the files will eventually be bundled
//     // in production
//     path: buildPath,
//     filename: 'bundle.js', // template name based on keys in entry
//     publicPath: '/build/'
//   },

//   module: {
//     loaders: [ // webpack's equivalent of browserify transforms and RequireJS plugins is a loader
//       {
//         test: /\.jsx$/,
//         loader: 'react-hot!babel?stage=2',
//         include: [mainPath, path.join(srcPath, 'app')],
//         exclude: [nodeModulesPath, /lib/]
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel?stage=2',
//         include: path.join(__dirname, 'src')
//       },
//       {
//         test: /\.jsx?$/,
//         loader: "eslint-loader",
//         exclude: [nodeModulesPath, /lib/]
//       },
//       {
//         test: /\.css$/,
//         loader: 'style!css',
//         include: path.join(srcPath, 'css')
//       },
//       {
//         test: /\.(png|jpg)$/,
//         loader: "url-loader?limit=8192" // inline base64 URLs for <=8k images, direct URLs for the rest
//       },
//       {
//         test: /\.jpg$/,
//         loader: "file-loader"
//       }
//     ]
//   },
//   // We have to manually add the Hot Replacement plugin when running from Node
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin()
//   ]
// };
