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
    this.playingField = Array.from(initialState);
  }

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {}

  getScore() {
    this.playingField.map((row) => {
      row.map((cell) => {
        if (cell !== 0) {
          this.score += cell;
        }
      });
    });

    return this.score;
  }

  getState() {
    return this.playingField;
  }

  getStatus() {}

  start() {
    this.playingField[Math.floor(Math.random() * this.playingField.length)][
      Math.floor(Math.random() * this.playingField.length)
    ] = 2;
    this.fillRandomTile();
    this.fillRandomTile();
  }
  restart() {}

  fillRandomTile() {
    const emptyFields = [];

    for (let row = 0; row < this.playingField.length; row++) {
      for (let column = 0; column < this.playingField.length; column++) {
        if (this.playingField[row][column] === 0) {
          emptyFields.push([row, column]);
        }
      }
    }

    const [emptyRow, emptyColumn] =
      emptyFields[Math.floor(Math.random() * emptyFields.length)];

    this.playingField[emptyRow][emptyColumn] = 2;
  }
}

module.exports = Game;
