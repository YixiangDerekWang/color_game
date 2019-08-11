var messageDisplay = document.querySelector('#message')
var h1 = document.querySelector('h1')
var resetButton = document.querySelector('#reset')
var modeButtons = document.querySelectorAll('.mode')
var squares = document.querySelectorAll('.square')
var colorDisplay = document.querySelector('.colorDisplay')
var currentMode = 'Hard'
var pickColor


init()

function init() {
  resetButton.addEventListener('click', () => {
    if (currentMode === 'Easy') {
      reset(3)
    } else {
      reset(6)
    }
  })
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', onSquareClicked)
  }
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', changeMode)
  }
  reset()
}

function changeMode() {

  // change selected mode
  for (var j = 0; j < modeButtons.length; j++) {
    modeButtons[j].classList.remove('selected')
  }
  this.classList.add('selected')

  // generate number of squares
  if (this.textContent === 'Easy') {
    var numberOfSquares = 3
    currentMode = 'Easy'
  } else {
    var numberOfSquares = 6
    currentMode = 'Hard'
  }
  reset(numberOfSquares)
}

function reset(numberOfSquares = 6) {

  // generate parameters
  var colors = generateRandomColors(numberOfSquares)
  pickedColor = pickColor(colors)
  colorDisplay.textContent = pickedColor

  // set every square
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block'
      squares[i].style.backgroundColor = colors[i]
    } else {
      squares[i].style.display = 'none'
    }
  }

  // set texts
  resetButton.textContent = 'New Colors'
  h1.style.backgroundColor = 'steelblue'
  messageDisplay.textContent = ''
}

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color
  }
}

function onSquareClicked() {
  var clickedColor = this.style.backgroundColor
  if (clickedColor === pickedColor) {
    messageDisplay.textContent = 'Correct!'
    changeColors(clickedColor)
    h1.style.backgroundColor = clickedColor
    resetButton.textContent = 'Play Again?'
  } else {
    this.style.backgroundColor = '#232323'
    messageDisplay.textContent = 'Try Again'
  }
}

function pickColor(colors) {
  var rand = Math.floor(Math.random() * colors.length)
  return colors[rand]
}

function generateRandomColors(colorNum) {
  var colors = []
  for (var i = 0; i < colorNum; i++) {
    colors.push(randomColor())
  }
  return colors
}

function randomColor() {
  var baseColors = []
  for (var i = 0; i < 3; i++) {
    baseColors[i] = Math.floor(Math.random() * 256)
  }
  return 'rgb(' + baseColors[0] + ', ' + baseColors[1] +
    ', ' + baseColors[2] + ')'
}