const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator()

const locale = ['british-to-american', 'american-to-british']

const text1 = 'Mangoes are my favorite fruit.'
const text1Ans = 'Mangoes are my <span class="highlight">favourite</span> fruit.'

const text2 = 'I ate yogurt for breakfast.'
const text2Ans = 'I ate <span class="highlight">yoghurt</span> for breakfast.'

const text3 = 'We had a party at my friend\'s condo.'
const text3Ans = 'We had a party at my friend\'s <span class="highlight">flat</span>.'

const text4 = 'Can you toss this in the trashcan for me?'
const text4Ans = 'Can you toss this in the <span class="highlight">bin</span> for me?'

const text5 = 'The parking lot was full.'
const text5Ans = 'The <span class="highlight">car park</span> was full.'

const text6 = 'Like a high tech Rube Goldberg machine.'
const text6Ans = 'Like a high tech <span class="highlight">Heath Robinson device</span>.'

const text7 = 'To play hooky means to skip class or work.'
const text7Ans = 'To <span class="highlight">bunk off</span> means to skip class or work.'

const text8 = 'No Mr. Bond, I expect you to die.'
const text8Ans = 'No <span class="highlight">Mr</span> Bond, I expect you to die.'

const text9 = 'Dr. Grosh will see you now.'
const text9Ans = '<span class="highlight">Dr</span> Grosh will see you now.'

const text10 = 'Lunch is at 12:15 today.'
const text10Ans = 'Lunch is at <span class="highlight">12.15</span> today.'

// to american english
const text11 = 'We watched the footie match for a while.'
const text11Ans = 'We watched the <span class="highlight">soccer</span> match for a while.'

const text12 = 'Paracetamol takes up to an hour to work.'
const text12Ans = '<span class="highlight">Tylenol</span> takes up to an hour to work.'

const text13 = 'First, caramelise the onions.'
const text13Ans = 'First, <span class="highlight">caramelize</span> the onions.'

const text14 = 'I spent the bank holiday at the funfair.'
const text14Ans = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'

const text15 = 'I had a bicky then went to the chippy.'
const text15Ans = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'

const text16 = 'I\'ve just got bits and bobs in my bum bag.'
const text16Ans = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.'

const text17 = 'The car boot sale at Boxted Airfield was called off.'
const text17Ans = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'

const text18 = 'Have you met Mrs Kalyani?'
const text18Ans = 'Have you met <span class="highlight">Mrs.</span> Kalyani?'

const text19 = 'Prof Joyner of King\'s College, London.'
const text19Ans = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.'

const text20 = 'Tea time is usually around 4 or 4.30.'
const text20Ans = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.'

// highlight translation
const text21 = 'Mangoes are my favorite fruit.'
const text21Ans = 'Mangoes are my <span class="highlight">favourite</span> fruit.'

const text22 = 'I ate yogurt for breakfast.'
const text22Ans = 'I ate <span class="highlight">yoghurt</span> for breakfast.'

const text23 = 'We watched the footie match for a while.'
const text23Ans = 'We watched the <span class="highlight">soccer</span> match for a while.'

const text24 = 'Paracetamol takes up to an hour to work.'
const text24Ans = '<span class="highlight">Tylenol</span> takes up to an hour to work.'


suite('Unit Tests', () => {
  suite('Translate to British English', function () {
    test(text1, function (done) {
      assert.equal(translator.translate(text1, locale[1]), text1Ans)
      done()
    })

    test(text2, function (done) {
      assert.equal(translator.translate(text2, locale[1]), text2Ans)
      done()
    })

    test(text3, function (done) {
      assert.equal(translator.translate(text3, locale[1]), text3Ans)
      done()
    })

    test(text4, function (done) {
      assert.equal(translator.translate(text4, locale[1]), text4Ans)
      done()
    })

    test(text5, function (done) {
      assert.equal(translator.translate(text5, locale[1]), text5Ans)
      done()
    })

    test(text6, function (done) {
      assert.equal(translator.translate(text6, locale[1]), text6Ans)
      done()
    })

    test(text7, function (done) {
      assert.equal(translator.translate(text7, locale[1]), text7Ans)
      done()
    })

    test(text8, function (done) {
      assert.equal(translator.translate(text8, locale[1]), text8Ans)
      done()
    })

    test(text9, function (done) {
      assert.equal(translator.translate(text9, locale[1]), text9Ans)
      done()
    })

    test(text10, function (done) {
      assert.equal(translator.translate(text10, locale[1]), text10Ans)
      done()
    })

  })

  suite('Translate to American English', function () {
    test(text11, function (done) {
      assert.equal(translator.translate(text11, locale[0]), text11Ans)
      done()
    })

    test(text12, function (done) {
      assert.equal(translator.translate(text12, locale[0]), text12Ans)
      done()
    })

    test(text13, function (done) {
      assert.equal(translator.translate(text13, locale[0]), text13Ans)
      done()
    })

    test(text14, function (done) {
      assert.equal(translator.translate(text14, locale[0]), text14Ans)
      done()
    })

    test(text15, function (done) {
      assert.equal(translator.translate(text15, locale[0]), text15Ans)
      done()
    })

    test(text16, function (done) {
      assert.equal(translator.translate(text16, locale[0]), text16Ans)
      done()
    })

    test(text17, function (done) {
      assert.equal(translator.translate(text17, locale[0]), text17Ans)
      done()
    })

    test(text18, function (done) {
      assert.equal(translator.translate(text18, locale[0]), text18Ans)
      done()
    })

    test(text19, function (done) {
      assert.equal(translator.translate(text19, locale[0]), text19Ans)
      done()
    })

    test(text20, function (done) {
      assert.equal(translator.translate(text20, locale[0]), text20Ans)
      done()
    })
  })

  suite('Highlight translation', function () {
    test(text21, function (done) {
      assert.equal(translator.translate(text21, locale[1]), text21Ans)
      done()
    })

    test(text22, function (done) {
      assert.equal(translator.translate(text22, locale[1]), text22Ans)
      done()
    })

    test(text23, function (done) {
      assert.equal(translator.translate(text23, locale[0]), text23Ans)
      done()
    })

    test(text24, function (done) {
      assert.equal(translator.translate(text24, locale[0]), text24Ans)
      done()
    })
  })
});
