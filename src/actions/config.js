export const SET_GRID_SIZE = "SET_GRID_SIZE";
export const SET_TIME = "SET_TIME";
export const SET_NAME = "SET_NAME";
export const RESET_CONFIG = "RESET_CONFIG";

export const resetConfig = () => dispatch => {
  dispatch({
    type: RESET_CONFIG,
    payload: {}
  });
};

export const setGridSize = size => dispatch => {
  dispatch({
    type: SET_GRID_SIZE,
    payload: {
      size
    }
  });
};

export const setTime = time => dispatch => {
  dispatch({
    type: SET_TIME,
    payload: {
      time
    }
  });
};

export const setName = name => dispatch => {
  dispatch({
    type: SET_NAME,
    payload: {
      name
    }
  });
};
