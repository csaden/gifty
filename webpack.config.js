var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, 'build'), // This is where images AND js will go
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/assets' // This is used to generate URLs to e.g. images
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['react-hot', 'babel-loader'],
      include: path.join(__dirname, 'src'),
      exclude: [/node_modules/, /lib/]
    }]
  }
};

// if (TARGET === 'start' || !TARGET) {
//   // webpack dev server automatically refreshes content inthe browser
//   module.exports = merge(common, {
//     eslint: {
//       configFile: '.eslintrc'
//     },
//     devtool: 'eval',
//     devServer: {
//       colors: true,
//       historyApiFallback: true,
//       hot: true,
//       inline: true,
//       progress: true,
//       debug: true,
//       port: 3000
//     },
//     plugins: [
//       new webpack.optimize.CommonsChunkPlugin('common.js'),
//       new HtmlWebpackPlugin({
//         inject: true, // injects script tag for js at end of body
//         template: 'src/index.html'
//       }),
//       new webpack.NoErrorsPlugin(), // if you want to see ESLint warnings in
//       // console during development using WebpackDevServer,
//       // remove NoErrorsPlugin from webpack config
//       new webpack.HotModuleReplacementPlugin()
//     ]
//   });
// }
