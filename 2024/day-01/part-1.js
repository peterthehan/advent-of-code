const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line) {
  const [firstValue, secondValue] = line.split(/\s+/);
  first.push(Number(firstValue));
  second.push(Number(secondValue));
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const first = [];
const second = [];
lines.forEach(parseInput);

first.sort();
second.sort();

const answer = first
  .map((value, index) => Math.abs(value - second[index]))
  .reduce((totalDistance, distance) => totalDistance + distance, 0);

console.log(answer);
