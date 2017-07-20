import { generateGrid } from "../util";
export const START_GAME = "START_GAME";
export const SELECT_NUMBER = "SELECT_NUMBER";

export const startGame = size => async dispatch => {
  const grid = generateGrid(size);
  dispatch({
    type: START_GAME,
    payload: {
      grid
    }
  });
};

export const selectNumber = id => async dispatch => {
  dispatch({
    type: SELECT_NUMBER,
    payload: {
      id
    }
  });
};
