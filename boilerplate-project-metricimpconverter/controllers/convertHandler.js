function ConvertHandler() {

  this.getNum = function (input) {

    let result = input.split(/[a-z]/)[0]

    return result;
  };

  this.getUnit = function (input) {
    const possUnit = input.split(/[0-9]/)
    let result = possUnit[possUnit.length - 1]

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const unitConversion = {
      'gal': 'L', 'l': 'gal',
      'mi': 'km', 'km': 'mi',
      'kg': 'lbs', 'lbs': 'kg'
    }
    let result = unitConversion[initUnit]

    return result;
  };

  this.spellOutUnit = function (unit) {
    const spell = { 'gal': 'gallons', 'l': 'litres', 'mi': 'miles', 'km': 'kilometers', 'lbs': 'pounds', 'kg': 'kilograms' }
    let result = spell[unit]

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break
      case 'l':
        result = initNum / galToL
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'kg':
        result = initNum / lbsTokg
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum / miTokm
        break
      default:
        result = 'invalid unit'
        break
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initNum)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result;
  };

}

module.exports = ConvertHandler;
