import {flatGliderGun} from './game-patterns/gliderPattern.js'
import {horizonLine} from './game-patterns/horizonPattern.js'


const rows = 40;
const cols = 90;


const createEmptyBoard = function () {
  const state = [];
  for (let i = 0; i < rows; i++) {
    state[i] = [];
    for (let j = 0; j < cols; j++) {
      state[i][j] = false
    }
  }
  return state
};


const injectPatternIntoNewGrid = function(pattern){

 const patternToBoolean = castBoardToBoolean(pattern);
  const state = createEmptyBoard();

  let patternRows = patternToBoolean.length, patternCols = patternToBoolean[0].length;
  let topLeftIndex = [Math.round((rows-patternRows)/2)-1,Math.round((cols-patternCols)/2)-1];

  let i = topLeftIndex[0];

  for (; i < patternRows+topLeftIndex[0]; i++) {
    let j = topLeftIndex[1];
    for (; j < patternCols+topLeftIndex[1]; j++) {
      if(patternToBoolean[i - topLeftIndex[0]][j - topLeftIndex[1]]===true){

      }
      state[i][j] = patternToBoolean[i - topLeftIndex[0]][j - topLeftIndex[1]]
    }

  }
  return state;
};

const castBoardToBoolean = function(board){

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = (board[i][j]) ?  true : false;
    }
  }
  return board
};

const getPattern = function (pattern) {
  switch (pattern) {
    case "gliderBoard": return injectPatternIntoNewGrid(flatGliderGun());
    case "horizonLine": return injectPatternIntoNewGrid(horizonLine())
  }
  return null;
};

const createRandomizedBoard = function () {
  const state = [];
  for (let i = 0; i < rows; i++) {
    state[i] = [];
    for (let j = 0; j < cols; j++) {
      state[i][j] = Math.random() > .5 ? false : true;
    }
  }

  return state
};


const state = createEmptyBoard();

export default {
  rows, cols, state, createEmptyBoard, createRandomizedBoard, getPattern
}
