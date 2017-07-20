import { SET_GRID_SIZE, SET_TIME, SET_NAME } from "../actions/config";

const initialState = {
  size: 4,
  time: 30,
  name: ""
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_NAME:
      return {
        ...state,
        name: payload.name
      };
    case SET_TIME:
      return {
        ...state,
        time: payload.time
      };
    case SET_GRID_SIZE:
      return {
        ...state,
        size: payload.size
      };
    default:
      return state;
  }
}
