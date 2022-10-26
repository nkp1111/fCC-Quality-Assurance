const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('input number tests', function () {

    test('whole number input', function () {
      assert.match(convertHandler.getNum('1gal'), /^[0-9]+$/)
    })

    test('decimal number input', function () {
      assert.match(convertHandler.getNum('1.4gal'), /^\d*\.\d+$/)
    })

    test('fractional input', function () {
      assert.match(convertHandler.getNum('1/4gal'), /^\d*\.\d+$/)
    })

    test('fraction input with decimal', function () {
      assert.match(convertHandler.getNum('3.3/2gal'), /^\d*\.\d+$/)
    })

    test('double fraction error', function () {
      assert.equal(convertHandler.getNum('4/4/4gal'), 'invalid number')
    })

    test('default input 1 when not provided', function () {
      assert.isNotNaN(convertHandler.getNum('gal'))
    })

  })

  suite('input unit tests', function () {

    const { validInputs, unitConversion, spell } = require('../controllers/data.js')

    const testUnit = 'L'

    test('valid input unit', function () {
      assert.include(validInputs, convertHandler.getReturnUnit(testUnit))
    })

    test('invalid input unit', function () {
      assert.notInclude(validInputs, convertHandler.getReturnUnit('gale'), 'invalid unit')
    })

    test('correct return unit', function () {
      assert.equal(convertHandler.getReturnUnit(testUnit), unitConversion[testUnit.toLowerCase()])
    })

    test('spelled out unit name', function () {
      assert.equal(convertHandler.spellOutUnit(testUnit), spell[testUnit.toLowerCase()])
    })

  })

  suite('conversion of value in different unit', function () {
    test('gal to L', function () {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541)
    })

    test('L to gal', function () {
      assert.equal(convertHandler.convert(3.78541, 'L'), 1)
    })

    test('mi to km', function () {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934)
    })

    test('km to mi', function () {
      assert.equal(convertHandler.convert(1.60934, 'km'), 1)
    })

    test('lbs to kg', function () {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359)
    })

    test('kg to lbs', function () {
      assert.equal(convertHandler.convert(0.45359, 'kg'), 1)
    })
  })

});