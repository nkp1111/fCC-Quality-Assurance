class SudokuSolver {

  validate(puzzleString) {
    let puzzlePieces = puzzleString.split('')

    // check original puzzle length
    if (puzzlePieces.length !== 81) {
      return 'Expected puzzle to be 81 characters long'
    }

    // filter invalid characters
    puzzlePieces = puzzlePieces.filter((ele) => {
      if (/\d/.test(ele) || ele === '.') {
        return ele
      }
    })

    // check for valid characters length
    if (puzzlePieces.length !== 81) {
      return 'Invalid characters in puzzle'
    }

    // check for invalid puzzle
    // check all rows for same characters
    // this.checkRowPlacement(puzzleString, row, column, value)

    // check all columns for same characters
    // check region placement
    // sum of all 1-9 equals 45

    // if alls well
    return true

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

