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

    // if alls well
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // row string
    const rowString = puzzleString.substring((row - 1) * 9, row * 9)
    const rowVal = rowString.split('').filter((d, i) => {
      if (i + 1 != column && d === value) {
        return d
      }
    })

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
      if (i + 1 != row && d === value) {
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
    let rowCount = 0
    const region = puzzleString.split('').filter((d, i) => {
      if (Math.floor(i / 9) !== rowCount) {
        rowCount += 1
      }
      if (Math.floor(rowCount / 3) === Math.floor(row / 3)) {
        if (Math.floor((i % 9) / 3) === Math.floor(column / 3)) {
          return d
        }
      }
    }).join('')
    const regionVal = region.split('').filter((d, i) => {
      if (i + 1 != row && d === value) {
        return d
      }
    })

    if (regionVal.length >= 1) {
      return false
    } else {
      return true
    }
  }

  solve(puzzleString) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const possibleAns = puzzleString.split('').map((d, i) => {
      if (d === '.') {
        let rowNum = Math.floor(i / 9) + 1
        let colNum = Math.floor(i % 9) + 1
        for (let num of numbers) {
          const regionResult = this.checkRegionPlacement(puzzleString, rowNum, colNum, num)
          const rowResult = this.checkRowPlacement(puzzleString, rowNum, colNum, num)
          const colResult = this.checkColPlacement(puzzleString, rowNum, colNum, num)
          console.log(regionResult, rowResult, colResult)
          if (regionResult && rowResult && colResult) {
            return num
          }
        }
      } else {
        return d
      }
    }).join('')

    return possibleAns.includes('.')
      ? false
      : possibleAns
  }
}

module.exports = SudokuSolver;

