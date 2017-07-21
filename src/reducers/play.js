import _ from "lodash";
import {
  START_GAME,
  SELECT_NUMBER,
  UPDATE_TIME_ELAPSED,
  CLEAR_TIME_ELAPSED,
  FINISH_GAME,
  RESET_PLAY
} from "../actions/play";
const initialState = {
  grid: [],
  selectedNumbers: [],
  finished: false,
  elapsedTime: 0,
  gameFinished: false,
  percentageComplete: 0
};

const traverseNumbers = (grid, process) => {
  _.each(grid, row => {
    _.each(row, process);
  });
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case RESET_PLAY:
      return initialState;
    case FINISH_GAME:
      return {
        ...state,
        gameFinished: true
      };
    case CLEAR_TIME_ELAPSED:
      return {
        ...state,
        elapsedTime: 0,
        finished: false
      };
    case UPDATE_TIME_ELAPSED:
      const elapsedTime = state.elapsedTime + payload.add;
      const newStateElapsed = elapsedTime === payload.time
        ? {
            ...state,
            elapsedTime,
            finished: true
          }
        : {
            ...state,
            elapsedTime
          };
      return newStateElapsed;
    case START_GAME:
      return {
        ...state,
        finished: false,
        gameFinished: false,
        grid: payload.grid
      };
    case SELECT_NUMBER:
      const newState = { ...state };
      traverseNumbers(newState.grid, numberData => {
        if (!numberData.found) {
          if (numberData.id === payload.id) {
            if (
              !_.includes(_.map(newState.selectedNumbers, "id"), numberData.id)
            ) {
              numberData.selected = true;
              newState.selectedNumbers.push(numberData);
            }
            if (
              newState.selectedNumbers.length === 2 &&
              newState.selectedNumbers[0].number ===
                newState.selectedNumbers[1].number
            ) {
              traverseNumbers(newState.grid, numberDataEqual => {
                if (
                  _.includes(
                    _.map(newState.selectedNumbers, "id"),
                    numberDataEqual.id
                  )
                ) {
                  let totalNumbers = 0;
                  let foundNumbers = 0;
                  numberDataEqual.found = true;
                  traverseNumbers(newState.grid, numberDataPercentage => {
                    totalNumbers++;
                    if (numberDataPercentage.found) {
                      foundNumbers++;
                    }
                  });
                  newState.percentageComplete = Math.floor(
                    foundNumbers * 100 / totalNumbers
                  );
                  if (newState.percentageComplete === 100) {
                    newState.finished = true;
                  }
                }
              });
            }
            if (newState.selectedNumbers.length === 3) {
              traverseNumbers(newState.grid, numberDataExceed => {
                newState.selectedNumbers = [];
                numberDataExceed.selected = false;
              });
              traverseNumbers(newState.grid, numberDataExceed => {
                if (numberDataExceed.id === payload.id) {
                  numberDataExceed.selected = true;
                  newState.selectedNumbers.push(numberDataExceed);
                }
              });
            }
          }
        }
      });
      return newState;
    default:
      return state;
  }
}
