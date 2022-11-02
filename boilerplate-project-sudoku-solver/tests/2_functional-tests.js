const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  const validPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

  const invalidPuzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...a'

  const puzzleCanNotBeSolved = '55.91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

  suite('api/solve', function () {

    test('#1 puzzle with valid puzzle string', function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: validPuzzle })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'solution')
        })
      done()
    })

    test('#2 puzzle with missing puzzle string', function (done) {
      chai.request(server)
        .post('/api/solve')
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Required field missing"}')
        })
      done()
    })

    test('#3 puzzle with invalid characters', function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: invalidPuzzle })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Invalid characters in puzzle"}')
        })
      done()
    })

    test('#4 Solve a puzzle with incorrect length', function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: validPuzzle + '4' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Expected puzzle to be 81 characters long"}')
        })
      done()
    })

    test('#5 a puzzle that cannot be solved', function (done) {
      chai.request(server)
        .post('/api/solve')
        .send({ puzzle: puzzleCanNotBeSolved })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Puzzle cannot be solved"}')
        })
      done()
    })

  })



  suite('api/check', function () {

    test('#6 puzzle placement with all fields', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzle,
          value: '4',
          coordinate: 'a1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
        })
      done()
    })

    test('#7 required field missing', function (done) {
      chai.request(server)
        .post('/api/check')
        .send()
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"Required field(s) missing"}')
        })
      done()
    })

    test('#8 puzzle placement with invalid characters', function (done) {
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

    test('#9 puzzle placement with incorrect length', function (done) {
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

    test('#10 puzzle placement with invalid placement coordinate', function (done) {
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

    test('#11 puzzle placement with invalid placement value', function (done) {
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

    test('#12 puzzle with single placement conflict', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzle,
          value: '1',
          coordinate: 'a1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'valid')
          assert.property(res.body, 'conflict')
          assert.equal(res.body.conflict.length, 1)
        })
      done()
    })


    test('#13 puzzle with multiple placement conflict', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzle,
          value: '7',
          coordinate: 'a1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'valid')
          assert.property(res.body, 'conflict')
          assert.equal(res.body.conflict.length, 2)
        })
      done()
    })


    test('#14 puzzle with all placement conflict', function (done) {
      chai.request(server)
        .post('/api/check')
        .send({
          puzzle: validPuzzle,
          value: '3',
          coordinate: 'a1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'valid')
          assert.property(res.body, 'conflict')
          assert.equal(res.body.conflict.length, 3)
        })
      done()
    })
  })

});

