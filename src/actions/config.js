export const SET_GRID_SIZE = "SET_GRID_SIZE";
export const SET_TIME = "SET_TIME";
export const SET_NAME = "SET_NAME";

export const setGridSize = size => async dispatch => {
  dispatch({
    type: SET_GRID_SIZE,
    payload: {
      size
    }
  });
};

export const setTime = time => async dispatch => {
  dispatch({
    type: SET_TIME,
    payload: {
      time
    }
  });
};

export const setName = name => async dispatch => {
  dispatch({
    type: SET_NAME,
    payload: {
      name
    }
  });
};
