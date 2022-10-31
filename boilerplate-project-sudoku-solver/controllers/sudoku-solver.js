class SudokuSolver {

  validate(puzzleString) {
    let puzzlePieces = puzzleString.split('')

    if (puzzlePieces.length !== 81) {
      return 'Expected puzzle to be 81 characters long'
    }

    puzzlePieces = puzzlePieces.filter((ele) => {
      if (/\d/.test(ele) || ele === '.') {
        return ele
      }
    })

    if (puzzlePieces.length !== 81) {
      return 'Invalid characters in puzzle'
    }
    else {
      return true
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    puzzleString.map(d => {
      if (puzzleString.includes(d)) {

      }
    })
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;

