/*var utils = require('./serverUtils');
var request = require('supertest');
var should = require('should');
var app = require('../../server/server');

describe('information at root directory of server', function() {
  it('is connecting locally', function(done) {
  // pass in our server to supertest
  request(app)
    .get('/login')
    // test passes if statusCode is 200
    .expect(200)
    // test will timeout without end
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      should.exist(res.body._id);
      should.not.exist(err);
      done();
    });
  });
});
*/
