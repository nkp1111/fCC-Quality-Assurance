const { validInputs, unitConversion, spell } = require('./data.js')
function ConvertHandler() {

  this.getNum = function (input) {
    let result
    let possNum = input.split(/[a-z]/i)[0] || '1'
    const validNum = possNum.split('/').length
    if (validNum > 2) {
      return 'invalid number'
    } else {
      result = eval(possNum)
    }

    return parseFloat(result);
  };

  this.getUnit = function (input) {
    const possUnit = input.split(/[0-9]/)
    let result = possUnit[possUnit.length - 1]

    if (result === 'l') {
      result = 'L'
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {

    let result = unitConversion[initUnit.toLowerCase()] || 'invalid unit'

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = spell[unit.toLowerCase()]

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result
    initUnit = initUnit.toLowerCase()
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }

    return result === 'invalid unit' ? 'invalid unit' : result.toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result;
  };

}

module.exports = ConvertHandler;
