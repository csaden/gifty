var Gift = require('./giftModel.js');
var aws = require('aws-lib');
var request = require('request');
var S = require('string');
require('dotenv').load();
var prodAdv = aws.createProdAdvClient(process.env.AMAZON_CLIENT_ID, process.env.AMAZON_CLIENT_SECRET, process.env.AMAZON_ASSOCIATE_TAG);

module.exports = {
  // call to Amazon API to get a friend's 'liked' item on facebook
  // passing in keyword (ie book title) that we get from facebook, and category, with the req body
  // TODO: need to add category parameter to the clicked object in client side
  lookupItemByKeyword: function(req, res) {
    // hard coding for testing will refactor lataer
    var bookKeyword = req.body.keyword;
    console.log(bookKeyword);
    // var temp = JSON.parse(req.body.friend);
    // // console.log('REQ BODY', temp[1].books.data[0].name);
    // var bookKeyword = temp[1].books.data[0].name;

    var options = {SearchIndex: 'Books', Keywords: bookKeyword, ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}
    prodAdv.call('ItemSearch', options, function(err, result) {
      res.send(result);
    });
  },

  // call to Amazon API to get similar items based on the 'liked' item
  getSimilarItems: function(req, res) {
    var ASIN = req.body.ASIN;
    var options = {ItemId: ASIN, ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}

    // var options = {SearchIndex: 'Books', Keywords: bookKeyword, ResponseGroup: 'Offers, ItemAttributes, Images, OfferSummary, PromotionSummary'}
    prodAdv.call('SimilarityLookup', options, function(err, result) {
      res.send(result);
    });
  },

  getEvents: function(req, res){

    //console.log("REQUEST:------>", req.body);
    var url = S('http://api.bandsintown.com/events/search.json?artists%5B%5D={{artist}}&date={{startDate}},{{endDate}}&location={{loc}}&radius=10&app_id=Gyftee').template(req.body).s;
    //console.log("URL:------>", url);
    var requestOptions = {
     url: url,
     json: true
   };

   request(requestOptions, function(error, response, body) {
     if (!error && response.statusCode === 200) {
      console.log(JSON.stringify(body));
      res.send(body);
    } else {
     res.send({ success: false, message: 'Unknown Error getting result from bandsintown api.'});
   }
 })

 }
  // TODO: search etsy using image tags or other facebook metadata
  // and get surprise gifts (grab bag feature)

};
