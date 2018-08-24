/**
 * @todo refactor current player, don't use array but use current player as
 * an property of the return object of player
 */

/**
 *
 * @module Player
 * @param {*} name
 * @param {*} symbol
 */
const Player = function(name, symbol) {
  let score = 0
  return { name, symbol, score }
}

/**
 * @module Players
 * @returns .add(), .change(), .list(), .current()
 */
const Players = function() {
  let _players = []
  let _current

  const add = function(name, symbol) {
    let player = Player(name, symbol)
    _players.push(player)
    _current = _players[0]
    return _players
  }

  const list = function() {
    return _players
  }

  const resetCurrent = function() {
    _current = _players[0]
    return current
  }

  const change = function() {
    _current = _players.filter(function(player) {
      return player != _current
    })[0]
    return true
  }

  const current = function() {
    return _current
  }

  return {
    add,
    change,
    list,
    current,
    resetCurrent
  }
}

/**
 * @module GameBoard
 * @returns .status(), .getCell(), .setCell()
 */
const GameBoard = function() {
  let boardStatus = [['', '', ''], ['', '', ''], ['', '', '']]

  /**
   * * Winning formations consist of 8 distinct formation
   * * 3 rows, 3 columns, 2 diagonal lines
   */
  const winningFormations = function() {
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
    return boardStatus.concat(transposedBoard, [diagonalLine1, diagonalLine2])
  }

  let matchAll = function(arr, value) {
    return _.every(arr, ele => ele === value)
  }

  return {
    status() {
      return boardStatus
    },
    getCell(posX, posY) {
      return boardStatus[posX][posY]
    },
    setCell(posX, posY, value) {
      if (this.getCell(posX, posY) === '') {
        boardStatus[posX][posY] = value
        return boardStatus[posX][posY]
      } else {
        return false
      }
    },
    checkWin(currentPlayer) {
      return _.any(winningFormations(), formation =>
        matchAll(formation, currentPlayer.symbol)
      )
    },
    checkDraw() {
      return _.every(winningFormations(), formation =>
        _.every(formation, cell => cell != '')
      )
    }
  }
}

/**
 * Represent the main module of the Game
 * @module MainGame
 * @returns .GameBoard
 */
const MainGame = (function() {
  let board = GameBoard()
  let players = Players()
  let winner // to check true/false if the game have a winner

  const refreshBoard = function() {
    let cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
      let { row: posX, column: posY } = cell.dataset
      cell.dataset.value = board.getCell(posX, posY)
    })
    if (board.checkWin(players.current())) {
      winner = players.current()
      addWinnerSplash(winner)
      winner.score += 1
    } else if (board.checkDraw()) {
      addDrawSplash()
    }
  }

  /**
   * Add events to cells
   */
  const setCellsEvent = function() {
    let cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (winner) {
          return
        } // return now if there is a winner
        let { row: posX, column: posY } = cell.dataset
        if (cell.dataset.value != '') {
          return
        }
        board.setCell(posX, posY, players.current().symbol)
        refreshBoard()
        players.change()
      })
    })
  }

  const addWinnerSplash = function(player) {
    let winnerElement = document.createElement('div')
    winnerElement.classList.add('winner')
    winnerElement.innerHTML = `
    <h5>
      Winner<br>${player.name}
    </h5
    `
    document.body.appendChild(winnerElement)
    winnerElement.addEventListener('click', function() {
      this.parentNode.removeChild(this)
      newGame()
    })
  }

  const addDrawSplash = function() {
    let winnerElement = document.createElement('div')
    winnerElement.classList.add('winner')
    winnerElement.innerHTML = '<h5> Draw </h5'
    document.body.appendChild(winnerElement)
    winnerElement.addEventListener('click', function() {
      this.parentNode.removeChild(this)
      newGame()
    })
  }

  const setPlayerScore = function() {
    let [player1, player2] = document.querySelectorAll('.score')
    player1.textContent = players.list()[0].score
    player2.textContent = players.list()[1].score
  }

  const newGame = function() {
    players.resetCurrent()
    setPlayerScore()
    winner = false
    board = GameBoard()
    refreshBoard()
    setCellsEvent()
  }

  const start = function() {
    players = Players()
    players.add('Player 1', 'x')
    players.add('Player 2', 'o')
    this.newGame()
  }

  const reset = function() {
    players = Players()
    players.add('Player 1', 'x')
    players.add('Player 2', 'o')
    this.newGame()
  }

  return { newGame, start, reset }
})()

let game = MainGame
game.start()
document.querySelector('#btn-new').onclick = game.newGame
document.querySelector('#btn-reset').onclick = game.reset.bind(game)
