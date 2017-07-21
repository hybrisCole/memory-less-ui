import { generateGrid } from "../util";
export const START_GAME = "START_GAME";
export const SELECT_NUMBER = "SELECT_NUMBER";
export const UPDATE_TIME_ELAPSED = "UPDATE_TIME_ELAPSED";
export const CLEAR_TIME_ELAPSED = "CLEAR_TIME_ELAPSED";

let timeElapsedIntervalId = -1;

export const startGame = (size, time) => async dispatch => {
  const grid = generateGrid(size);
  dispatch({
    type: START_GAME,
    payload: {
      grid
    }
  });
  if (timeElapsedIntervalId === -1) {
    clearInterval(timeElapsedIntervalId);
    dispatch({
      type: CLEAR_TIME_ELAPSED,
      payload: {}
    });
  }
  timeElapsedIntervalId = setInterval(() => {
    console.log(UPDATE_TIME_ELAPSED);
    dispatch({
      type: UPDATE_TIME_ELAPSED,
      payload: {
        add: 1,
        time
      }
    });
  }, 1000);
};

export const freezeGame = () => dispatch => {
  clearInterval(timeElapsedIntervalId);
  dispatch({
    type: 'FINISH',
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
