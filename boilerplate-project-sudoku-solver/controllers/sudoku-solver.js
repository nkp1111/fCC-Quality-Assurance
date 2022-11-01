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
      if (Math.floor(Math.floor(i / 9) / 3) === Math.floor(row / 3)) {
        if (Math.floor((i % 9) / 3) === Math.floor(column / 3)) {
          return d
        }
      }
    }).join('')
    const regionVal = region.split('').filter((d, i) => {
      if (i + 1 != row && d == value) {
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

    // to check whether puzzle can be solved
    let ans = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    // puzzleString is valid
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    let newPuzzleString = puzzleString
    let puzzleArr = newPuzzleString.split('')
    for (let i = 0; i < puzzleArr.length; i++) {
      if (puzzleArr[i] === '.') {
        let row = Math.floor(i / 9) + 1
        let col = Math.floor(i % 9) + 1

        for (let num of numbers) {
          let value = num
          const rowResult = this.checkRowPlacement(puzzleString, row, col, value)
          const colResult = this.checkColPlacement(puzzleString, row, col, value)
          const regionResult = this.checkRegionPlacement(puzzleString, row, col, value)
          if (rowResult && colResult && regionResult) {
            puzzleArr[i] = value
            newPuzzleString = puzzleArr.join('')
          }
        }
      }
    }

    // console.log(puzzleArr)
    puzzleArr.map((d, i) => {
      ans[i] += +d
    })

    return puzzleArr.includes('.')
      ? false
      : ans.filter(d => d !== 45).length > 0
        ? false
        : puzzleArr.join('')
  }

}

module.exports = SudokuSolver;

