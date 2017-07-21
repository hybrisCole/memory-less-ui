import _ from "lodash";
import shortid from "shortid";
export const generateGrid = size =>
  _.chain(_.range(1, size * size / 2 + 1))
    .flatMap(number => [number, number])
    .map(number => ({
      number,
      selected: false,
      found: false,
      id: shortid.generate()
    }))
    .shuffle()
    .chunk(size)
    .value();
