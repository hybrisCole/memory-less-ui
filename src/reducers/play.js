import { START_GAME } from "../actions/play";
const initialState = {
  grid: [],
  totalTime: 30,
  elapsedTime: 0,
  percentageComplete: 0
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_GAME:
      return {
        ...state,
        grid: payload.grid
      };
    default:
      return state;
  }
}
