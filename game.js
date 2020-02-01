console.log('initializing...')
resizeCells()
console.log('cells resized')

let welcomeUI = document.querySelector('#welcome')

let gameEndInterval = null
let completeCellsList = null
let playerWon = null
let isTie = false
let singlePlayerName = null
let gameNo = 1
let turnsNo = 0

function playerClickEvent(event) {
  event.target.textContent = singlePlayerSymbol
  document.querySelectorAll('.unmarked-cell').forEach((cell) => {
    cell.removeEventListener('click', playerClickEvent)
    cell.style.cursor = ''
  })
  event.target.classList.remove('unmarked-cell')
  turnsNo++
  let result = is_finished()
  if (result !== false) {
    let restartButton = document.querySelector('#single-player-restart')
    restartButton.removeAttribute('hidden')
    restartButton.addEventListener('click', restartGame)
    gameEnd(result, true)
  } else {
    computerTurn()
  }
}

function restartGame(event) {
  clearInterval(gameEndInterval)
  let gameBoard = document.querySelectorAll('.cell')
  gameBoard.forEach((cell) => {
    cell.textContent = ''
    cell.classList.add('unmarked-cell')
    cell.classList.remove('win', 'loss', 'tie')
  })
  event.target.setAttribute('hidden', 'hidden')
  event.target.removeEventListener('click', restartGame)
  gameEndInterval = null
  completeCellsList = null
  playerWon = null
  isTie = false
  turnsNo = 0
  gameNo++
  singlePlayerGame()
}

function gameEnd(cells, isWin) {
  let scoreTable = document.querySelector('#score')
  let newRow = scoreTable.insertRow(-1)
  let newTh = document.createElement('th')
  newTh.innerText = gameNo.toString()
  newTh.setAttribute('scope', 'row')
  newRow.appendChild(newTh)
  if (isTie === true) {
    completeCellsList = document.querySelectorAll('.cell')
    gameEndInterval = setInterval(() => {
      completeCellsList.forEach((cell) => {
        cell.classList.toggle('tie')
      })
    }, 500)
    newRow.insertCell(-1).textContent = 'Tie'
    newRow.insertCell(-1).textContent = turnsNo.toString()
    newRow.classList.add('tie')
    return
  }
  completeCellsList = cells
  playerWon = isWin
  gameEndInterval = setInterval(() => {
    completeCellsList.forEach((cell) => {
      cell.classList.toggle(playerWon ? 'win' : 'loss')
    })
  }, 500)
  newRow.insertCell(-1).textContent = playerWon ? 'Win' : 'Loss'
  newRow.insertCell(-1).textContent = turnsNo.toString()
  newRow.classList.add(playerWon ? 'win' : 'loss')
}

let singlePlayerUI = document.querySelector('#single-player-game')
let singlePlayerScoreUI = document.querySelector('#single-player-score')

let singlePlayerButton = document.querySelector('#single')
let singlePlayerStart = document.querySelector('#single-player-start')

singlePlayerButton.addEventListener('click', singlePlayerInit)
singlePlayerStart.addEventListener('click', singlePlayerGameStart)

let singlePlayerSymbol = ''
let computerPlayerSymbol = ''

function singlePlayerInit() {
  console.log('single player game chosen')
  welcomeUI.setAttribute('hidden', 'hidden')
  singlePlayerUI.removeAttribute('hidden')
}

function singlePlayerGameStart() {
  console.log('single player game initializing...')
  let nameField = document.querySelector('#single-player-name-field')

  if (nameField.value === '') {
    console.log('empty name field')
    nameField.classList.add('is-invalid')

    nameField.addEventListener('focus', function () {
      nameField.classList.remove('is-invalid')
    })
  } else {
    console.log('player name set: ' + nameField.value)
    singlePlayerName = nameField.value
    singlePlayerGame()
  }
}

function singlePlayerGame() {
  console.log('single player game starts')
  let name = document.querySelector('#single-player-name')
  name.textContent = singlePlayerName

  singlePlayerUI.setAttribute('hidden', 'hidden')
  singlePlayerScoreUI.removeAttribute('hidden')

  singlePlayerSymbol = coinToss() ? '0' : 'X'
  computerPlayerSymbol = singlePlayerSymbol === '0' ? 'X' : '0'
  document.querySelector('#single-player-symbol').textContent = singlePlayerSymbol
  console.log('player symbol is: ' + singlePlayerSymbol)

  if (singlePlayerSymbol === 'X') {
    playerTurn()
  } else {
    computerTurn()
  }
}

function playerTurn() {
  console.log('player\'s turn starts')
  let gameBoard = document.querySelectorAll('.unmarked-cell')
  if (gameBoard.length === 0) {
    isTie = true
    let restartButton = document.querySelector('#single-player-restart')
    restartButton.removeAttribute('hidden')
    restartButton.addEventListener('click', restartGame)
    gameEnd()
    return
  }
  gameBoard.forEach((cell) => {
    cell.addEventListener('click', playerClickEvent)
    cell.style.cursor = 'pointer'
  })
}

function computerTurn() {
  console.log('computers\' turn starts')
  let gameBoard = document.querySelectorAll('.unmarked-cell')
  if (gameBoard.length === 0) {
    isTie = true
    let restartButton = document.querySelector('#single-player-restart')
    restartButton.removeAttribute('hidden')
    restartButton.addEventListener('click', restartGame)
    gameEnd()
    return
  }
  turnsNo++
  let randomCell = getRandomInt(gameBoard.length)
  gameBoard[randomCell].textContent = computerPlayerSymbol
  gameBoard[randomCell].classList.remove('unmarked-cell')
  let result = is_finished()
  if (result !== false) {
    let restartButton = document.querySelector('#single-player-restart')
    restartButton.removeAttribute('hidden')
    restartButton.addEventListener('click', restartGame)
    gameEnd(result, false)
  } else {
    playerTurn()
  }
}

// let multiPlayerUI = document.querySelector('#multi-player-game')
// let multiPlayerScoreUI = document.querySelector('#multi-player-score')
//
// let multiPlayerButton = document.querySelector('#multi')
// let multiPlayerStart = document.querySelector('#multi-player-start')
//
// multiPlayerButton.addEventListener('click', multiPlayerInit)
// multiPlayerStart.addEventListener('click', multiPlayerGameStart)
//
// function multiPlayerInit() {
//   console.log('multi player game chosen')
//   welcomeUI.setAttribute('hidden', 'hidden')
//   multiPlayerUI.removeAttribute('hidden')
// }
//
// function multiPlayerGameStart() {
//   console.log('multi player game initializing...')
// }
