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

      res.send(req.body)
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
