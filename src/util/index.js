import _ from "lodash";
export const generateGrid = size => {
  const numbers = _.chain(_.range(1, size * size / 2 + 1))
    .flatMap(number => [number, number])
    .shuffle()
    .chunk(size)
    .value();
  return numbers;
};
