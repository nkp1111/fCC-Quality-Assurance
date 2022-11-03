const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Issue = require('../models/issues')

chai.use(chaiHttp);

suite('Functional Tests', function () {

  suite('tests for route /api/issues/{project}', function () {

    const toCheck = { issue_title: 'my test', issue_text: 'text', created_by: 'Neeraj', assigned_to: 'someone', status_text: 'it is ok', open: true }

    test('#1 post with all fields', function (done) {
      chai.request(server)
        .post('/api/issues/my_test')
        .send(toCheck)
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.body.issue_title, toCheck.issue_title)
          assert.equal(res.body.issue_text, toCheck.issue_text)
          assert.equal(res.body.open, toCheck.open)
          assert.equal(res.body.status_text, toCheck.status_text)
          assert.equal(res.body.assigned_to, toCheck.assigned_to)
          assert.equal(res.body.created_by, toCheck.created_by)
          assert.isDefined(res.body._id)
          done()
        })
    })

    const secondTest = { issue_title: 'second test', issue_text: 'second one 12 more to go', created_by: 'neeraj' }

    test('#2 post with required fields only',
      function (done) {
        chai.request(server)
          .post('/api/issues/second_test')
          .send(secondTest)
          .end(function (err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.issue_title, secondTest.issue_title)
            assert.equal(res.body.issue_text, secondTest.issue_text)
            assert.equal(res.body.created_by, secondTest.created_by)
            assert.isDefined(res.body._id)
            done()
          })
      }
    )

    test('#3 post with missing required field', function (done) {
      chai.request(server)
        .post('/api/issues/third_test')
        .send({ issue_title: 'third test', issue_text: '11 more to go' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"required field(s) missing"}')
          done()
        })
    })

    test('#4 get without any query valid project name', function (done) {
      chai.request(server)
        .get('/api/issues/my_test')
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.typeOf(res.body, 'array')
          done()
        })
    })

    test('#5 get with one filter', function (done) {
      chai.request(server)
        .get('/api/issues/second_test?open=true')
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.typeOf(res.body, 'array')
          done()
        })
    })

    test('#6 get with multiple filters', function (done) {
      chai.request(server)
        .get('/api/issues/second_test?open=true&created_by=neeraj')
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.typeOf(res.body, 'array')
          done()
        })
    })

    test('#7 put request to update one field', function (done) {
      chai.request(server)
        .put('/api/issues/get_issues_test_310846')
        .send({ _id: '6363b73a9fc11fa7dd8f4092', status_text: 'Is it Ok or Not?' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"result":"successfully updated","_id":"6363b73a9fc11fa7dd8f4092"}')
          done()
        })
    })

    test('#8 put request to update multiple field', function (done) {
      chai.request(server)
        .put('/api/issues/get_issues_test_310846')
        .send({ _id: '6363b73a9fc11fa7dd8f4092', status_text: 'It\'s okay to be not ok', issue_title: 'new one' })
        .end(async function (err, res) {

          assert.equal(res.status, 200)
          assert.equal(res.text, '{"result":"successfully updated","_id":"6363b73a9fc11fa7dd8f4092"}')
          done()
        })
    })

    test('#9 put request to update with missing id', function (done) {
      chai.request(server)
        .put('/api/issues/my_test')
        .send({ status_text: 'It\'s okay to be not ok', open: false })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"missing _id"}')
          done()
        })
    })

    test('#10 put request with no fields to update', function (done) {
      chai.request(server)
        .put('/api/issues/my_test')
        .send({ _id: '635a70761ce9e3acec79221e' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"no update field(s) sent","_id":"635a70761ce9e3acec79221e"}')
          done()
        })
    })

    test('#11 put request with invalid id', function (done) {
      chai.request(server)
        .put('/api/issues/my_test')
        .send({ _id: '635aafe5b248f6442551ffff', status_text: 'not ok' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"could not update","_id":"635aafe5b248f6442551ffff"}')
          done()
        })

    })

    test('#12 delete request with valid id', function (done) {
      chai.request(server)
        .delete('/api/issues/second_test')
        .send({ _id: '635aafe5b248f6442551766f' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          done()
        })
    })

    test('#13 delete request with invalid id', function (done) {
      chai.request(server)
        .delete('/api/issues/my_test')
        .send({ _id: '635aafe5b248f6442551ffff' })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"could not delete","_id":"635aafe5b248f6442551ffff"}')
          done()
        })
    })

    test('#14 delete request with missing id', function (done) {
      chai.request(server)
        .delete('/api/issues/my_test')
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, '{"error":"missing _id"}')
          done()
        })
    })

  })

});
