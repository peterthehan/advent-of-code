const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line) {
  return line.split(" ").map(Number);
}

function findNextValue(numbers) {
  let currentNumbers = numbers;
  const firstSequenceNumbers = [];

  while (currentNumbers.some(Boolean)) {
    const nextNumbers = [];
    for (let i = 0; i < currentNumbers.length - 1; ++i) {
      nextNumbers.push(currentNumbers[i + 1] - currentNumbers[i]);
    }
    firstSequenceNumbers.push(nextNumbers[0]);
    currentNumbers = nextNumbers;
  }

  return (
    numbers[0] -
    firstSequenceNumbers.reverse().reduce((sum, num) => num - sum, 0)
  );
}

const answer = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .map(parseInput)
  .map(findNextValue)
  .reduce((sum, num) => sum + num, 0);

console.log(answer); // 1062
