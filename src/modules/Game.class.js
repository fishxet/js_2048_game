/* eslint-disable no-param-reassign */
'use strict';
class Game {
  static gameStatus = {
    idle: 'idle',
    playing: 'playing',
    win: 'win',
    lose: 'lose',
  };

  constructor(
    initialState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ) {
    this.initialState = initialState;
    this.score = 0;
    this.status = Game.gameStatus.idle;
    this.playingField = initialState.map((row) => [...row]);
  }

  slideAndCombine(cells) {
    cells = cells.filter((x) => x !== 0);

    for (let j = 0; j < cells.length - 1; j++) {
      if (cells[j] === cells[j + 1]) {
        cells[j] *= 2;
        cells[j + 1] = 0;
        j++;
      }
    }

    cells = cells.filter((x) => x !== 0);

    while (cells.length < this.playingField.length) {
      cells.push(0);
    }

    return cells;
  }

  moveLeft() {
    for (let i = 0; i < this.playingField.length; i++) {
      const cells = [...this.playingField[i]];

      this.playingField[i] = this.slideAndCombine(cells);
    }
    this.fillRandomTile();
  }

  moveRight() {
    for (let i = 0; i < this.playingField.length; i++) {
      const cells = [...this.playingField[i]].reverse();

      this.playingField[i] = this.slideAndCombine(cells).reverse();
    }
    this.fillRandomTile();
  }

  moveUp() {
    for (let col = 0; col < this.playingField.length; col++) {
      let column = this.playingField.map((row) => row[col]);

      column = this.slideAndCombine(column);

      for (let row = 0; row < this.playingField.length; row++) {
        this.playingField[row][col] = column[row];
      }
    }
    this.fillRandomTile();
  }

  moveDown() {
    for (let col = 0; col < this.playingField.length; col++) {
      let column = this.playingField.map((row) => row[col]).reverse();

      column = this.slideAndCombine(column).reverse();

      for (let row = 0; row < this.playingField.length; row++) {
        this.playingField[row][col] = column[row];
      }
    }
    this.fillRandomTile();
  }

  getScore() {
    this.score = this.playingField.reduce(
      (sum, row) => sum + row.reduce((rSum, cell) => rSum + cell, 0),
      0,
    );

    return this.score;
  }

  getState() {
    return this.playingField;
  }

  getStatus() {
    return this.status;
  }

  start() {
    this.status = Game.gameStatus.playing;

    for (let i = 0; i < 2; i++) {
      this.fillRandomTile();
    }
  }

  restart() {
    this.playingField = this.initialState.map((row) => [...row]);
    this.score = 0;
    this.status = Game.gameStatus.idle;
  }

  fillRandomTile() {
    const emptyFields = [];

    for (let row = 0; row < this.playingField.length; row++) {
      for (let column = 0; column < this.playingField.length; column++) {
        if (this.playingField[row][column] === 0) {
          emptyFields.push([row, column]);
        }
      }
    }

    if (emptyFields.length > 0) {
      const [emptyRow, emptyColumn] =
        emptyFields[Math.floor(Math.random() * emptyFields.length)];

      this.playingField[emptyRow][emptyColumn] = 2;
    }
  }
}

module.exports = Game;
