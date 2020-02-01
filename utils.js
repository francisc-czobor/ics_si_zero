function resizeCells() {
  let cells = document.querySelectorAll('.cell')

  cells.forEach(function (cell) {
    cell.style.height = window.getComputedStyle(cell).width
  })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function coinToss() {
  return getRandomInt(2)
}

function is_finished () {
  let gameBoard = document.querySelectorAll('.cell')
  if (
    gameBoard[0].textContent === gameBoard[1].textContent
    && gameBoard[1].textContent === gameBoard[2].textContent
    && (gameBoard[0].textContent === 'X' || gameBoard[0].textContent === '0')
  ) {
    console.log('first row is complete')
    return [gameBoard[0], gameBoard[1], gameBoard[2]]
  } else if (
    gameBoard[3].textContent === gameBoard[4].textContent
    && gameBoard[4].textContent === gameBoard[5].textContent
    && (gameBoard[3].textContent === 'X' || gameBoard[3].textContent === '0')
  ) {
    console.log('second row is complete')
    return [gameBoard[3], gameBoard[4], gameBoard[5]]
  } else if (
    gameBoard[6].textContent === gameBoard[7].textContent
    && gameBoard[7].textContent === gameBoard[8].textContent
    && (gameBoard[6].textContent === 'X' || gameBoard[6].textContent === '0')
  ) {
    console.log('third row is complete')
    return [gameBoard[6], gameBoard[7], gameBoard[8]]
  } else if (
    gameBoard[0].textContent === gameBoard[3].textContent
    && gameBoard[3].textContent === gameBoard[6].textContent
    && (gameBoard[0].textContent === 'X' || gameBoard[0].textContent === '0')
  ) {
    console.log('first column is complete')
    return [gameBoard[0], gameBoard[3], gameBoard[6]]
  } else if (
    gameBoard[1].textContent === gameBoard[4].textContent
    && gameBoard[4].textContent === gameBoard[7].textContent
    && (gameBoard[1].textContent === 'X' || gameBoard[1].textContent === '0')
  ) {
    console.log('second column is complete')
    return [gameBoard[1], gameBoard[4], gameBoard[7]]
  } else if (
    gameBoard[2].textContent === gameBoard[5].textContent
    && gameBoard[5].textContent === gameBoard[8].textContent
    && (gameBoard[2].textContent === 'X' || gameBoard[2].textContent === '0')
  ) {
    console.log('third column is complete')
    return [gameBoard[2], gameBoard[5], gameBoard[8]]
  } else if (
    gameBoard[0].textContent === gameBoard[4].textContent
    && gameBoard[4].textContent === gameBoard[8].textContent
    && (gameBoard[0].textContent === 'X' || gameBoard[0].textContent === '0')
  ) {
    console.log('primary diagonal is complete')
    return [gameBoard[0], gameBoard[4], gameBoard[8]]
  } else if (
    gameBoard[2].textContent === gameBoard[4].textContent
    && gameBoard[4].textContent === gameBoard[6].textContent
    && (gameBoard[2].textContent === 'X' || gameBoard[2].textContent === '0')
  ) {
    console.log('secondary diagonal is complete')
    return [gameBoard[2], gameBoard[4], gameBoard[6]]
  }
  return false
}
