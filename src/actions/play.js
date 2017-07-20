import { generateGrid } from "../util";
export const START_GAME = "START_GAME";

export const startGame = size => async dispatch => {
  const grid = generateGrid(size);
  dispatch({
    type: START_GAME,
    payload: {
      grid
    }
  });
};
