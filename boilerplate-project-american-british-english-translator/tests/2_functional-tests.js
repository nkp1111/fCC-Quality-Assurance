const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

let text = 'Mangoes are my favorite fruit.'
let locale = ['american-to-british', 'british-to-american']
let textAns = 'Mangoes are my <span class="highlight">favourite</span> fruit.'

suite('Functional Tests', () => {
  suite('POST /api/translate', () => {
    test('#1 Translation with text and locale fields', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: locale[0],
          text: text
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'text')
          assert.property(res.body, 'translation')
          assert.equal(res.body.translation, textAns)
        })
      done()
    })

    test('#2 Translation with text and invalid locale field', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: 'invalid-locale',
          text
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Invalid value for locale field')
        })
      done()
    })

    test('#3 Translation with missing text field', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: locale[0]
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Required field(s) missing')
        })
      done()
    })

    test('#4 Translation with missing locale field', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          text
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'Required field(s) missing')
        })
      done()
    })

    test('#5 Translation with empty text', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: locale[0],
          text: ''
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'error')
          assert.equal(res.body.error, 'No text to translate')
        })
      done()
    })

    test('#6 Translation with text that needs no translation', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: locale[1],
          text
        })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.isObject(res.body)
          assert.property(res.body, 'text')
          assert.property(res.body, 'translation')
          assert.equal(res.body.translation, 'Everything looks good to me!')
        })
      done()
    })
  })
});
