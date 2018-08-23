/**
 * @module Player
 * @returns player object with .name, .symbol
 */
const Player = function(name, symbol){
  let point = 0
  return { name, symbol, point }
}

/**
 * @module Players
 * @returns .add(), .change(), .list(), .current()
 */
const Players = function(){
  let players = []
  let currentPlayer = []
  const add = function(name, symbol){
    let player = Player(name, symbol)
    players.push(player)
    currentPlayer.unshift(player)
    return players
  }

  const list = function(){
    return players
  }

  const change = function(){
    currentPlayer.push(currentPlayer.shift())
    return true
  }

  const current = function(){
    return currentPlayer[0]
  }

  const resetCurrent = function(){
    currentPlayer = Array.from(players)
    return currentPlayer
  }

  return { add, change, list, current, resetCurrent  }
}

/**
 * @module GameBoard
 * @returns .status(), .getCell(), .setCell()
 */
const GameBoard = function(){
  let boardStatus = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  /**
   * Winning formations consist of 8 distinct formation
   * 3 rows, 3 columns, 2 diagonal lines
   */
  const winningFormations = function(){
    // Transpose board
    const [row1, row2, row3] = boardStatus
    const transposedBoard = _.zip(row1, row2, row3)

    // diagonal lines
    const diagonalLine1 = [
      boardStatus[0][0],
      boardStatus[1][1],
      boardStatus[2][2]
    ]
    const diagonalLine2 = [
      boardStatus[0][2],
      boardStatus[1][1],
      boardStatus[2][0]
    ]

    // return winning formations
    return boardStatus.concat(
      transposedBoard,
      [
        diagonalLine1,
        diagonalLine2
      ]
    )
  }


  let matchAll = function(arr, value){
    return _.every(arr, (ele) => (ele === value))
  }

  return {
    status(){
      return boardStatus
    },
    getCell(posX, posY){
      return boardStatus[posX][posY]
    },
    setCell(posX, posY, value){
      if (this.getCell(posX, posY) === '') {
        boardStatus[posX][posY] = value
        return boardStatus[posX][posY]
      } else {
        return false
      }
    },
    checkWin(currentPlayer){
      return _.any(winningFormations(), (formation) => {
        return matchAll(formation, currentPlayer.symbol)
      })
    }
  }
}

/**
 * Represent the main module of the Game
 * @module MainGame
 * @returns .GameBoard
 */
const MainGame = (function(){
  let board = GameBoard()
  let players = Players()
  let winner // to check true/false if the game have a winner

  const refreshBoard = function(){
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => {
      let { row: posX, column: posY } = cell.dataset
      cell.dataset.value = board.getCell(posX, posY)
    })
    if (board.checkWin(players.current())){
      winner = players.current()
      alert('Winer:' + players.current().name)
    }
  }

  /**
   * Add events to cells
   */
  const setCellsEvent = function(){
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => {
      cell.addEventListener('click', (event)=>{
        if (winner) { return } // return now if there is a winner
        let { row: posX, column: posY } = cell.dataset
        if (cell.dataset.value != ''){ return }
        board.setCell(posX, posY, players.current().symbol)
        refreshBoard()
        players.change()
      })
    })
  }

  return { // an object
    newGame(){
      players.resetCurrent()
      winner = false
      board = GameBoard()
      refreshBoard()
      setCellsEvent()
    },
    start(){
      players = Players()
      players.add('Binh','x')
      players.add('Xuan','o')
      this.newGame()
    }
  }

})()


let game = MainGame
game.start()
document.querySelector('#btn-new').onclick = game.newGame
