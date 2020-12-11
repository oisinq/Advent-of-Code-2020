const productOfDifferences = (voltages: number[]): number => {
  let [countOfOneDifferences, countOfThreeDifferences] = [0, 0];

  for (let i = 1; i < voltages.length; i++) {
    const difference = voltages[i] - voltages[i - 1];

    if (difference === 1) countOfOneDifferences += 1;
    if (difference === 3) countOfThreeDifferences += 1;
  }

  return countOfOneDifferences * countOfThreeDifferences;
};

const numberOfPossibleArrangements = (voltages: number[]): number => {
  if (voltages.length === 1) return 1;

  const possibleNextIndex: number[] = [1];

  if (voltages.length > 2 && voltages[2] - voltages[0] <= 3)
    possibleNextIndex.push(2);
  if (voltages.length > 3 && voltages[3] - voltages[0] <= 3)
    possibleNextIndex.push(3);

  return possibleNextIndex.reduce(
    (sum, index) => sum + numberOfPossibleArrangements(voltages.slice(index)),
    0
  );
};

var fs = require("fs");

const read = fs.readFileSync(`./q10/input.txt`);
const inputVoltages: [number] = read
  .toString()
  .split("\n")
  .map((value: string) => Number(value));

const voltages = [0, ...inputVoltages, Math.max(...inputVoltages) + 3];

voltages.sort((x, y) => x - y);

console.log("Part 1:", productOfDifferences(voltages));
console.log("Part 2:", numberOfPossibleArrangements(voltages));

export {};
