var requestHandler = require('../request-handler.js');
var request = require('request');
var expect = require('chai').expect;

describe('server', function() {
  it('requestHandler should exist and be a function', function(done) {
    expect(requestHandler.requestHandler).to.exist;
    expect(requestHandler.requestHandler).to.be.an('function');
    done();
  })

  it('should respond to GET requests for /classes/messages with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should not throw an error when responding to a GET request for /classes/messages', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(error).to.not.exist;
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send an object containing a `results` array', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests to /classes/messages', function(done) {
    var requestParams = {method: 'POST',
      url: 'http://127.0.0.1:3000/classes/messages',
      json: JSON.stringify({
        username: 'Jono',
        message: 'Do my bidding!'
      })
    };
    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with messages that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: JSON.stringify({
        username: 'Jono',
        message: 'Do my bidding!'})
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messages = JSON.parse(body).results;
        expect(JSON.parse(messages[0]).username).to.equal('Jono');
        expect(JSON.parse(messages[0]).message).to.equal('Do my bidding!');
        done();
      });
    });
  });

  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('Should include correct headers', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(response.headers).to.exist;
      done();
    })
  })


});
