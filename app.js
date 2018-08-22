/**
 * Represent the main module of the Game
 * @module mainGame
 * @returns .gameBoard
 */
const mainGame = function(){
  /**
   * @module gameBoard
   * @returns .status(), .getCell(), .setCell()
   */
  const gameBoard = (function(){
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
          console.log('success')
          return boardStatus[posX][posY]
        } else {
          console.log('false')
          return false
        }
      }
    }
  })()

  /**
   * Set cells value
   */
  let refreshBoard = function(){
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => {
      let { row: posX, column: posY } = cell.dataset
      cell.dataset.value = gameBoard.getCell(posX, posY)
    })
  }
  refreshBoard()

  /**
   * Add events to cells
   */
  let cells = document.querySelectorAll('.cell')
  cells.forEach((cell) => {
    cell.addEventListener('click', (event)=>{
      let { row: posX, column: posY } = cell.dataset
      gameBoard.setCell(posX, posY, 'o')
      refreshBoard()
    })
  })

  return { gameBoard }
}

/**
 * Create new game after DOM loaded
 */
// document.addEventListener('DOMContentLoaded', ()=>{
//   let game = mainGame()
//   console.log(game)
// })

let game = mainGame()