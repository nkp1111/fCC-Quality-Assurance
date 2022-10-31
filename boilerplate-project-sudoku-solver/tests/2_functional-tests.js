const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  const validPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

  const invalidPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...a'

  suite('api/check', function () {
    test('required field missing', function (done) {
      chai.request(server)
        .post('/api/check')
        .send()
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Required field(s) missing"}')
        })
      done()
    })

    test('puzzle placement with invalid characters', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          value: 5,
          puzzle: invalidPuzzle,
          coordinate: 'a1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Invalid characters in puzzle"}')
        })
      done()
    })

    test('puzzle placement with incorrect length', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          value: 7,
          puzzle: validPuzzle + '3',
          coordinate: 'a1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
        })
      done()
    })

    test('puzzle placement with invalid placement coordinate', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzle,
          value: 4,
          coordinate: 'j7'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Invalid coordinate"}')
        })
      done()
    })

    test('puzzle placement with invalid placement value', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzle,
          value: 'd',
          coordinate: 'a1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Invalid value"}')
        })
      done()
    })


  })

  suite('api/solve', function () {

    test('puzzle with missing puzzle string', function (done) {
      chai.request(server)
        .post('/api/solve')
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Required field missing"}')
        })
      done()
    })

    test('puzzle with invalid characters', function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: invalidPuzzle })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Invalid characters in puzzle"}')
        })
      done()
    })

    test('Solve a puzzle with incorrect length', function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: validPuzzle + '4' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
        })
      done()
    })
  })

  // test('')

});

