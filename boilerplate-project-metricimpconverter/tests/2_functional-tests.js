const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

  test('10L get request to /api/convert', function () {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"initNum":10,"initUnit":\"L\","returnNum":2.64172,"returnUnit":\"gal\","string":\"10 liters converts to 2.64172 gallons\"}')
      })
  })

  test('32g get /api/convert', function () {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'invalid unit')
      })
  })

  test('3/7.2/4kg get /api/convert', function () {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'invalid number')
      })
  })

  test('3/7.2/4kilomegagram get /api/convert', function () {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.text, 'invalid number and unit')
      })
  })

  test('kg get /api/convert', function () {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.text, '{"initNum":1,"initUnit":\"kg\","returnNum":2.20462,"returnUnit":\"lbs\","string":\"1 kilograms converts to 2.20462 pounds\"}')
      })
  })

});
