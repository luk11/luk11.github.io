'use strict';

const newGame = document.querySelector('.new-game');
const remaining = document.querySelector('.remaining');
const container = document.querySelector('.container');

let columns = document.getElementById('columns').value * 1;
let rows = document.getElementById('rows').value * 1;
let mines = document.getElementById('mines').value * 1;

let numberCells = rows * columns;
let cells = [];
let positions = [];
let remainingMines = mines;

startGame();

////////////////// Game procedure

function startGame() {
  getUniqueRandom(numberCells, mines); // array containing all MinePositons
  initBoard();
  hideMines();
  addListeners();
  countAdjacentMines();
  updateCSS();
}

newGame.addEventListener('click', () => {
  container.innerHTML = '';
  columns = document.getElementById('columns').value * 1;
  rows = document.getElementById('rows').value * 1;
  mines = document.getElementById('mines').value * 1;
  numberCells = rows * columns;
  cells = [];
  positions = [];
  remainingMines = mines;
  startGame();
});

///////////////// Functions

function updateCSS() {
  document.documentElement.style.setProperty('--columns', columns);
  document.documentElement.style.setProperty('--rows', rows);
}

function initBoard() {
  for (let i = 0; i < numberCells; i++) {
    document
      .querySelector('.container')
      .insertAdjacentHTML(
        'beforeend',
        `<div class="cell hidden" id="${i}"></div>`
      );
  }
  cells = document.querySelectorAll('.cell');
  remaining.textContent = `${remainingMines} mines remaining`;
}

function getUniqueRandom(range, count) {
  let randomNumbers = new Set();
  while (randomNumbers.size < count) {
    randomNumbers.add(Math.floor(Math.random() * range));
  }
  positions = [...randomNumbers];
  // return [...randomNumbers];
}

function hideMines() {
  positions.forEach(cell => (cells[cell].textContent = 'X'));
}

function addListeners() {
  for (const [i, cell] of cells.entries()) {
    cell.addEventListener('click', function () {
      showCells(i);
      checkForMine(i);
    });
    cell.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      markCell(i);
    });
  }
}

function showCells(id) {
  cells[id].classList.remove('hidden');

  if (cells[id].textContent === '') {
    const adjacentCells = findAdjacentCells(id);
    adjacentCells.forEach(cell => {
      if (cells[cell].classList.contains('hidden')) {
        showCells(cell);
      }
    });
  }
}

const checkForMine = function (id) {
  if (cells[id].textContent === 'X') {
    for (let i = 0; i < numberCells; i++) {
      document.getElementById(i).classList.remove('hidden');
      document.getElementById(i).classList.add('lost');
    }
  }
};

const markCell = function (id) {
  if (cells[id].classList.contains('marked')) {
    cells[id].classList.remove('marked');
    remainingMines++;
  } else {
    if (remainingMines > 0) {
      cells[id].classList.add('marked');
      remainingMines--;
      checkWin(positions);
    }
  }

  remaining.textContent = `${remainingMines} ${
    remainingMines == 1 ? 'mine' : 'mines'
  } remaining`;
};

function findAdjacentCells(id) {
  const adjacentCellsAll = [
    id - columns >= 0 && id % columns !== 0 ? id - columns - 1 : null,
    id - columns >= 0 ? id - columns : null,
    id - columns >= 0 && id % columns !== columns - 1 ? id - columns + 1 : null,
    id % columns !== 0 ? id - 1 : null,
    id % columns !== columns - 1 ? id + 1 : null,
    id + columns < numberCells && id % columns !== 0 ? id + columns - 1 : null,
    id + columns < numberCells ? id + columns : null,
    id + columns < numberCells && id % columns !== columns - 1
      ? id + columns + 1
      : null,
  ];
  const adjacentCells = adjacentCellsAll.filter(item => item !== null);
  return adjacentCells;
}

function countAdjacentMines() {
  for (let id = 0; id < numberCells; id++) {
    if (cells[id].textContent === 'X') {
      // No need to calculate if cell is a mine
      continue;
    } else {
      // Calculate the adjacent mines for the current cell
      const adjacentCells = findAdjacentCells(id);
      let adjacentMines = 0;
      adjacentCells.forEach(cell => {
        if (cells[cell].textContent === 'X') {
          adjacentMines++;
        }
      });
      // Write number of adjacent Mines into cell
      cells[id].textContent = adjacentMines === 0 ? '' : adjacentMines;
    }
  }
}

function checkWin(minePositions) {
  let win = true;
  minePositions.forEach(id => {
    if (!cells[id].classList.contains('marked')) {
      win = false;
    }
  });

  if (win === true) {
    minePositions.forEach(id => (cells[id].textContent = '🌸'));
    cells.forEach(cell => {
      cell.classList.remove('hidden');
      cell.classList.add('win');
    });
  }
}
