'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, value, coordinate } = req.body

      // if any value is missing
      if (!puzzle || !coordinate || !value) {
        res.send({ error: 'Required field(s) missing' })
        return
      }

      // validation 
      let validation = solver.validate(puzzle)
      if (validation !== true) {
        res.send({ error: validation })
        return
      }

      // to check coordinates validity
      if (!/^[a-i][1-9]$/i.test(coordinate)) {
        // console.log('invalid coor', coordinate)
        res.send({ error: 'Invalid coordinate' })
        return
      }

      // to check for value validity
      if (value.length !== 1 || !/[1-9]/.test(value)) {
        // console.log('invalid value', value)
        res.send({ error: 'Invalid value' })
        return
      }

      // coordinates
      const checkRow = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9 }
      const rowNum = checkRow[(coordinate.split('')[0]).toLowerCase()]
      const colNum = coordinate.split('')[1]

      // check row placement
      const rowResult = solver.checkRowPlacement(puzzle, rowNum, colNum, value)

      // check column placement
      const columnResult = solver.checkColPlacement(puzzle, rowNum, colNum, value)

      // check region placement
      const regionResult = solver.checkRegionPlacement(puzzle, rowNum, colNum, value)
      // console.log('results', rowResult, columnResult, regionResult)

      if (regionResult === false || columnResult === false || rowResult === false) {
        let conflict = []
        if (!rowResult) {
          conflict.push("row")
        }
        if (!columnResult) {
          conflict.push("column")
        }
        if (!regionResult) {
          conflict.push("region")
        }
        res.send({ valid: false, conflict: conflict })
      }
      res.send({ valid: true })
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body

      // if no puzzle
      if (!puzzle) {
        res.send({ error: 'Required field missing' })
      }

      // validation
      let validation = solver.validate(puzzle)
      if (validation !== true) {
        res.send({ error: validation })
      }

      let solution = solver.solve(puzzle)
      if (!solution) {
        res.send({ error: 'Puzzle cannot be solved' })
      }

      res.send({ solution: solution })
    });
};
