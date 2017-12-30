const rows = 30;
const cols = 30;

const createEmptyBoard = function() {
  const state = [];
  for (let i = 0; i < rows; i++) {
    state[i] = [];
    for (let j = 0; j < cols; j++) {
      state[i][j] = false
    }
  }
  return state
};

const createRandomizedBoard = function() {
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
  rows, cols, state, createEmptyBoard, createRandomizedBoard
}
