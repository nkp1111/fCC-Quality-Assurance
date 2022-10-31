const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();


suite('Unit Tests', () => {
  const validPuzzleString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

  const invalidPuzzleString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...a'

  test('#1 handle a valid puzzle string', function () {
    assert.equal(solver.validate(validPuzzleString), true)
  })

  test('#2 handle puzzle with invalid characters (not 1-9 or .)', function () {
    assert.equal(solver.validate(invalidPuzzleString), 'Invalid characters in puzzle')
  })
});
