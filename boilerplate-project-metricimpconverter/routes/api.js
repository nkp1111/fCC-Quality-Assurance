'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const { input } = req.query
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    console.log(initNum, initUnit, returnNum, returnUnit)
    res.send({ initNum, initUnit, returnNum, returnUnit, string: result })
  })

};
