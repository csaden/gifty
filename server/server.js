var express = require('express');
var mongoose = require('mongoose');
var db = require('./config/dbConfig');
var dotenv = require('dotenv');

//load .env file
dotenv.load();

var app = express();

// configure the server with all the middleware and the routing
require('./config/middleware')(app, express);

mongoose.connect(db.url);
mongoose.connection.once('connected', function(){
  console.log('Nifty gifty db is connected!');
});

module.exports = app;
