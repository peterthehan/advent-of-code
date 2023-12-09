const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line) {
  return line.split(" ").map(Number);
}

function findNextValue(numbers) {
  let currentNumbers = numbers;
  const lastSequenceNumbers = [];

  while (currentNumbers.some(Boolean)) {
    const nextNumbers = [];
    for (let i = 0; i < currentNumbers.length - 1; ++i) {
      nextNumbers.push(currentNumbers[i + 1] - currentNumbers[i]);
    }
    lastSequenceNumbers.push(nextNumbers[nextNumbers.length - 1]);
    currentNumbers = nextNumbers;
  }

  return (
    numbers[numbers.length - 1] +
    lastSequenceNumbers.reduce((sum, num) => sum + num, 0)
  );
}

const answer = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .map(parseInput)
  .map(findNextValue)
  .reduce((sum, num) => sum + num, 0);

console.log(answer); // 2043677056
