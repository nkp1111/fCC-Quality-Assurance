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
      }

      // validation 
      let validation = solver.validate(puzzle)
      if (validation !== true) {
        res.send({ error: validation })
      }

      // to check coordinates validity
      if (coordinate.length !== 2 || !/[a-i][1-9]/i.test(coordinate)) {
        res.send({ error: 'Invalid coordinate' })
      }

      // to check for value validity
      if (value.length !== 1 || !/[1-9]/.test(value)) {
        res.send({ error: 'Invalid value' })
      }

      // coordinates
      const checkRow = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9 }
      const rowNum = checkRow[coordinate.split('')[0]]
      const colNum = coordinate.split('')[1]
      // row string
      const row = puzzle.substring((rowNum - 1) * 9, rowNum * 9)

      // column string
      let colCount = colNum
      const column = puzzle.split('').filter((d, i) => {
        if (i % 9 === 0) {
          colCount = colNum
        }
        colCount--
        if (colCount === 0) {
          return d
        }
      }).join('')

      // region string
      let rowCount = 0
      const region = puzzle.split('').filter((d, i) => {
        if (Math.floor(i / 9) !== rowCount) {
          rowCount += 1
        }
        if (Math.floor(rowCount / 3) === Math.floor(rowNum / 3)) {
          if (Math.floor((i % 9) / 3) === Math.floor(colNum / 3)) {
            return d
          }
        }
      }).join('')

      // check row placement
      const rowResult = solver.checkRowPlacement(puzzle, row, column, value)
      // check column placement
      const columnResult = solver.checkColPlacement(puzzle, row, column, value)

      // check region placement
      const regionResult = solver.checkRegionPlacement(puzzleString, row, column, region, value)

      if (regionResult === false || columnResult === false || rowResult === false) {
        let conflict = []
        if (!regionResult) {
          conflict.push("region")
        }
        if (!columnResult) {
          conflict.push("column")
        }
        if (!rowResult) {
          conflict.push("row")
        }
        console.log({ valid: false, conflict: conflict })
        res.send({ valid: false, conflict: conflict })
      }
      console.log({ valid: true })
      res.send({ valid: true })
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle, value, coordinate } = req.body

      // if no puzzle
      if (!puzzle) {
        res.send({ error: 'Required field missing' })
      }

      // validation
      let validation = solver.validate(puzzle)
      if (validation !== true) {
        res.send({ error: validation })
      }
      res.send(req.body)
    });
};
