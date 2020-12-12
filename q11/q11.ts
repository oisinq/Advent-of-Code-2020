type Coordinates = [number, number];

const countOccupiedSeatsOnBoard = (board): number => {
  let count = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      count += isSeatOccupied([i, j], board) ? 1 : 0;
    }
  }

  return count;
};

const isSeatOccupied = ([i, j]: Coordinates, board: string[][]): boolean =>
  board[i][j] === "#";

const countOccupiedAdjacentSeats = (
  [i, j]: Coordinates,
  board: string[][]
): number => {
  let count = 0;

  if (i - 1 in board) {
    if (j - 1 in board) count += isSeatOccupied([i - 1, j - 1], board) ? 1 : 0;
    if (j + 1 in board) count += isSeatOccupied([i - 1, j + 1], board) ? 1 : 0;
    count += isSeatOccupied([i - 1, j], board) ? 1 : 0;
  }

  if (i + 1 in board) {
    if (j - 1 in board) count += isSeatOccupied([i + 1, j - 1], board) ? 1 : 0;
    if (j + 1 in board) count += isSeatOccupied([i + 1, j + 1], board) ? 1 : 0;
    count += isSeatOccupied([i + 1, j], board) ? 1 : 0;
  }

  if (j in board[0]) {
    count += isSeatOccupied([i, j - 1], board) ? 1 : 0;
    count += isSeatOccupied([i, j + 1], board) ? 1 : 0;
  }

  return count;
};

const simulateTurn = (board: string[][]): [string[][], number] => {
  const nextTurnBoard: string[][] = [];
  let numChanges = 0;

  for (let i = 0; i < board.length; i++) {
    nextTurnBoard[i] = [];
    for (let j = 0; j < board[i].length; j++) {
      const currentSeat = board[i][j];

      if (
        currentSeat === "L" &&
        countOccupiedAdjacentSeats([i, j], board) === 0
      ) {
        nextTurnBoard[i].push("#");
        numChanges += 1;
      } else if (
        currentSeat === "#" &&
        countOccupiedAdjacentSeats([i, j], board) >= 4
      ) {
        nextTurnBoard[i].push("L");
        numChanges += 1;
      } else {
        nextTurnBoard[i].push(currentSeat);
      }
    }
  }

  return [nextTurnBoard, numChanges];
};

const getBoardFromInput = (input: string[]): string[][] => {
  const board: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    board[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      board[i].push(input[i][j]);
    }
  }

  return board;
};

var fs = require("fs");

const read = fs.readFileSync(`./q11/input.txt`);
const input: string[] = read.toString().split("\n");

let board: string[][] = getBoardFromInput(input);
let numChanges = -1;

while (numChanges !== 0) {
  [board, numChanges] = simulateTurn(board);
}

console.log(countOccupiedSeatsOnBoard(board));

export {};
