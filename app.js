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
      ['a', 'a', 'a'],
      ['a', 'a', 'a'],
      ['a', 'a', 'a']
    ]

    return {
      status(){
        return boardStatus
      },
      getCell(posX, posY){
        return boardStatus[posX][posY]
      },
      setCell(posX, posY, value){
        boardStatus[posX][posY] = value
        return boardStatus[posX][posY]
      }
    }
  })()

  /**
   * Add events to cells
   */
  let cells = document.querySelectorAll('.cell')
  cells.forEach((cell) => {
    cell.addEventListener('click', (event)=>{
      let posX = cell.dataset.row
      let posY = cell.dataset.column
      console.log(gameBoard.getCell(posX, posY))
    })
  })


  return {
    gameBoard
  }
}

/**
 * Create new game after DOM loaded
 */
document.addEventListener('DOMContentLoaded', ()=>{
  let game = mainGame()
  console.log(game)
})