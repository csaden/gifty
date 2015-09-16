var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var compression = require('compression');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../../webpack.config');
var proxy = require('proxy-middleware');
var url = require('url');

var static_path = path.join(__dirname, './../../build');

module.exports = function(app, express) {

  app.use(compression());

  // define routers
  var userRouter = express.Router();
  var giftRouter = express.Router();
  var giftListRouter = express.Router(); // giftList is a collection of gift items
  var friendRouter = express.Router();

  // Request body parsing middleware should be above methodOverride
  // express middleware

  app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors());

  // define API paths
  app.use('/api/users', userRouter);
  app.use('/api/gifts', giftRouter);
  app.use('/api/giftlists', giftListRouter);
  app.use('/api/friends', friendRouter);

  // --------your proxy----------------------
  app.use('/assets', proxy(url.parse('http://localhost:8080/assets')));

  app.get('/*', function(req, res) {
    res.sendFile(static_path + '/index.html');
  });

  // ------webpack-dev-server-----------------
  var server = new WebpackDevServer(webpack(config), {
      contentBase: path.resolve('./build'),
      hot: true,
      quiet: false,
      noInfo: false,
      historyApiFallback: true,
      // publicPath: config.output.publicPath,
      stats: { colors: true }
  });

  // run the two servers
  server.listen(8080, "localhost", function(err) {
    if (err) { console.log(err) };
    console.log('WebpackDevServer hot on http://localhost:8080');
  });

  var isProduction = process.env.NODE_ENV === 'production';
  var port = isProduction ? process.env.PORT : 3000;

  var appServer = app.listen(port, 'localhost', function (err) {
    if (err) { console.log(err) };

    var host = appServer.address().address;
    var port = appServer.address().port;
    console.log('\nNode serving magical gifts on http://%s:%s', host, port);
  });

  // require route files
  require('../users/userRoutes.js')(userRouter);
  require('../gifts/giftRoutes.js')(giftRouter);
  require('../giftlists/giftListRoutes.js')(giftListRouter);
  require('../friends/friendRoutes.js')(friendRouter);

};
