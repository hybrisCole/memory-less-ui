import { generateGrid } from "../util";
export const START_GAME = "START_GAME";
export const SELECT_NUMBER = "SELECT_NUMBER";
export const UPDATE_TIME_ELAPSED = "UPDATE_TIME_ELAPSED";
export const CLEAR_TIME_ELAPSED = "CLEAR_TIME_ELAPSED";
export const FINISH_GAME = "FINISH_GAME";
export const RESET_PLAY = "RESET_PLAY";

let timeElapsedIntervalId = -1;

export const resetPlay = () => dispatch => {
  dispatch({
    type: RESET_PLAY,
    payload: {}
  });
};

export const startGame = (size, time) => dispatch => {
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
  setTimeout(() => {
    dispatch({
      type: FINISH_GAME
    });
  }, 750);
};

export const selectNumber = id => dispatch => {
  dispatch({
    type: SELECT_NUMBER,
    payload: {
      id
    }
  });
};
