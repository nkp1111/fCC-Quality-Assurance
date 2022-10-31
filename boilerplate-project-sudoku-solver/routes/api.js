'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, value, coordinate } = req.body
      solver.validate(puzzle)
      let column
      puzzle.split('').map(d => {

      })
      res.send(req.body)
    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle, value, coordinate } = req.body
      if (!puzzle) {
        res.send({ error: 'Required field missing' })
      }
      let validation = solver.validate(puzzle)
      if (validation !== true) {
        res.send({ error: validation })
      }
      res.send(req.body)
    });
};
