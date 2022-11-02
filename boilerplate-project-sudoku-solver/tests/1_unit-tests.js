const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();


suite('Unit Tests', () => {
  const validPuzzleString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'

  const validPuzzleAns = '568913724342687519197254386685479231219538467734162895926345178473891652851726943'

  const invalidPuzzleString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...a'

  test('#1 handle a valid puzzle string', function () {
    assert.equal(solver.validate(validPuzzleString), true)
  })

  test('#2 handle puzzle with invalid characters (not 1-9 or .)', function () {
    assert.equal(solver.validate(invalidPuzzleString), 'Invalid characters in puzzle')
  })

  test('#3 a puzzle string that is not 81 characters in length', function () {
    assert.equal(solver.validate(validPuzzleString + '3'), 'Expected puzzle to be 81 characters long')
  })

  test('#4 a valid row placement', function () {
    assert.equal(solver.checkRowPlacement(validPuzzleString, 1, 1, 5), true)
  })

  test('#5 an invalid row placement', function () {
    assert.equal(solver.checkRowPlacement(validPuzzleString, 1, 2, 5), false)
  })

  test('#6 valid column placement', function () {
    assert.equal(solver.checkColPlacement(validPuzzleString, 3, 1, 1), true)
  })

  test('#7 invalid column placement', function () {
    assert.equal(solver.checkColPlacement(validPuzzleString, 3, 1, 5), false)
  })

  test('#8 valid region placement', function () {
    assert.equal(solver.checkRegionPlacement(validPuzzleString, 1, 1, 5), true)
  })

  test('#9 invalid region placement', function () {
    assert.equal(solver.checkRegionPlacement(validPuzzleString, 1, 1, 3), false)
  })

  test('#10 valid string pass the solver', function () {
    assert.equal(solver.solve(validPuzzleString, 0), true)
  })

  test('#11 invalid puzzle string fail the solver', function () {
    solver.solve(invalidPuzzleString, 0)
    assert.equal(solver.validSolution(solver.solution), false)
  })

  test('#12 incomplete puzzle solve', function () {
    assert.equal(solver.solve(validPuzzleString, 0), true)
  })

});
