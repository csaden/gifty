var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var webpack = require('webpack');

var static_path = path.join(__dirname, './../../build');
console.log(static_path);

module.exports = function(app, express) {

  app.enable('trust proxy');

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

  var isProduction = process.env.NODE_ENV === 'production';
  var port = isProduction ? process.env.PORT : 3000;

  // define API paths
  app.use('/api/users', userRouter);
  app.use('/api/gifts', giftRouter);
  app.use('/api/giftlists', giftListRouter);
  app.use('/api/friends', friendRouter);

  // require route files
  require('../users/userRoutes.js')(userRouter);
  require('../gifts/giftRoutes.js')(giftRouter);
  require('../giftlists/giftListRoutes.js')(giftListRouter);
  require('../friends/friendRoutes.js')(friendRouter);

};
