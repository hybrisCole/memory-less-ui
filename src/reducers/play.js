import _ from "lodash";
import { START_GAME, SELECT_NUMBER } from "../actions/play";
const initialState = {
  grid: [],
  selectedNumbers: [],
  totalTime: 30,
  elapsedTime: 0,
  percentageComplete: 0
};

const traverseNumbers = (grid, process) => {
  _.each(grid, row => {
    _.each(row, process);
  });
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case START_GAME:
      console.log(payload.grid);
      return {
        ...state,
        grid: payload.grid
      };
    case SELECT_NUMBER:
      const newState = _.clone(state);
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
                }
              });
            }
            if (newState.selectedNumbers.length === 3) {
              traverseNumbers(newState.grid, numberDataExceed => {
                newState.selectedNumbers = [];
                numberDataExceed.selected = false;
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
