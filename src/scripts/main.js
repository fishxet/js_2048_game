'use strict';

const Game = require('../modules/Game.class');
const game = new Game();
const buttonStart = document.querySelector('.start');
const gameScore = document.querySelector('.game-score');
const messageStart = document.querySelector('.message-start');

buttonStart.addEventListener('click', (e) => {
  game.start();

  const fieldRows = document.querySelectorAll('.field-row');
  const gameField = game.getState();

  e.preventDefault();

  messageStart.classList.add('hidden');

  fieldRows.forEach((field, rowIndex) => {
    const cells = Array.from(field.cells);

    cells.forEach((cell, cellIndex) => {
      if (gameField[rowIndex][cellIndex] !== 0) {
        cell.classList.add(`field-cell--${gameField[rowIndex][cellIndex]}`);
        cell.textContent = gameField[rowIndex][cellIndex];
      }
    });
  });

  gameScore.textContent = gameField.reduce(
    (acc, currentvalue) => acc + +currentvalue,
    0,
  );
});
// Write your code here
