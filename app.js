/**
 * @module Player
 * @returns player object with .name, .symbol
 */
const Player = function(name, symbol){
  return { name, symbol }
}

/**
 * @namespace Players
 * @returns .add(), .change(), .list(), .current()
 */
const Players = (function(){
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

  return { add, change, list, current }
})()

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

  return {
    status(){
      return boardStatus
    },
    getCell(posX, posY){
      return boardStatus[posX][posY]
    },
    setCell(posX, posY, value){
      if (this.getCell(posX, posY) !== value) {
        boardStatus[posX][posY] = value
        return boardStatus[posX][posY]
      } else {
        return false
      }
    },
    checkWin(){

    }
  }
}

/**
 * Represent the main module of the Game
 * @module MainGame
 * @returns .GameBoard
 */
const MainGame = (function(){

  const refreshBoard = function(){
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => {
      let { row: posX, column: posY } = cell.dataset
      cell.dataset.value = board.getCell(posX, posY)
    })
  }

  /**
   * Add events to cells
   */
  const setCellsEvent = function(){
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => {
      cell.addEventListener('click', (event)=>{
        let { row: posX, column: posY } = cell.dataset
        if (cell.dataset.value != ''){ return }
        board.setCell(posX, posY, Players.current().symbol)
        Players.change()
        console.log(board.status())
        refreshBoard()
      })
    })
  }

  const newGame = function(){
    board = GameBoard()
    refreshBoard()
    Players.add('Binh','x')
    Players.add('Xuan','o')
    setCellsEvent()
  }

  return { newGame }
})()
let game = MainGame
game.newGame()
document.querySelector('#btn-new').onclick = game.newGame