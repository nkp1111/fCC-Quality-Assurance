class SudokuSolver {

  constructor() {
    this.solution = ''
  }

  validate(puzzleString) {
    let puzzlePieces = puzzleString.split('')

    // check original puzzle length
    if (puzzlePieces.length !== 81) {
      return 'Expected puzzle to be 81 characters long'
    }

    // // filter invalid characters
    // puzzlePieces = puzzlePieces.filter((ele) => {
    //   if (/\d/.test(ele) || ele === '.') {
    //     return ele
    //   } else {
    //     return 'Invalid characters in puzzle'
    //   }  
    // })

    for (let p of puzzlePieces) {
      if (!/\d/.test(p) && p !== '.') {
        return 'Invalid characters in puzzle'
      }
    }

    // check for valid characters length
    if (puzzlePieces.length !== 81) {
      return 'Invalid characters in puzzle'
    }

    // if alls well
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // row string
    const rowString = puzzleString.substring((row - 1) * 9, row * 9)
    const rowVal = rowString.split('').filter((d, i) => {
      if (i + 1 != column && d == value) {
        return d
      }
    })

    // console.log(rowString, row, column, value, rowVal.length)
    if (rowVal.length >= 1) {
      return false
    } else {
      return true
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    // column string
    let colCount = column
    const columnString = puzzleString.split('').filter((d, i) => {
      if (i % 9 === 0) {
        colCount = column
      }
      colCount--
      if (colCount === 0) {
        return d
      }
    }).join('')
    const colVal = columnString.split('').filter((d, i) => {
      if (i + 1 != row && d == value) {
        return d
      }
    })

    if (colVal.length >= 1) {
      return false
    } else {
      return true
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // region string
    const region = puzzleString.split('').filter((d, i) => {
      if (Math.floor(Math.floor(i / 9) / 3) === Math.floor((row - 1) / 3)) {
        if (Math.floor((i % 9) / 3) === Math.floor((column - 1) / 3)) {
          return d
        }
      }
    }).join('')
    const regionVal = region.split('').filter((d, i) => {
      if (i + 1 != ((Math.floor((row - 1) % 3) * 3) + ((column - 1) % 3) + 1) && d == value) {
        return d
      }
    })

    if (regionVal.length >= 1) {
      return false
    } else {
      return true
    }
  }

  solve(puzzleString, ind) {

    if (ind === 81) {
      this.solution = puzzleString
      return true
    }

    if (puzzleString[ind] !== '.') {
      ind += 1
      return this.solve(puzzleString, ind)
    }

    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (let i = 0; i < numbers.length; i++) {
      let value = numbers[i]
      if (this.isSafe(puzzleString, ind, value)) {
        puzzleString = puzzleString.substring(0, ind) + value + puzzleString.substring(ind + 1)

        if (this.solve(puzzleString, ind + 1)) {
          return true
        }
      }
      puzzleString = puzzleString.substring(0, ind) + '.' + puzzleString.substring(ind + 1)
    }

    return false
  }

  isSafe(puzzleString, index, value) {
    let column = (index % 9) + 1 // since row and column are 1 based index
    let row = Math.floor(index / 9) + 1

    let rowRes = this.checkRowPlacement(puzzleString, row, column, value)
    let colRes = this.checkColPlacement(puzzleString, row, column, value)
    let regionRes = this.checkRegionPlacement(puzzleString, row, column, value)

    if (rowRes && colRes && regionRes) {
      return true
    } else {
      return false
    }
  }

  validSolution(solution) {
    console.log(solution)
    if (solution.length !== 81) {
      return false
    }
    let count = 45
    for (let i = 0; i < 81; i++) {
      if (i % 9 === 0) {
        if (count !== 45) {
          return false
        }
        count = 0
      }
      if (solution[i] == +solution[i]) {
        count += +solution[i]
      } else {
        return false
      }
    }
    return true
  }
}

module.exports = SudokuSolver;

