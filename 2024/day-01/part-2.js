const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line) {
  const [firstValue, secondValue] = line.split(/\s+/);
  first.push(firstValue);
  if (!(secondValue in second)) {
    second[secondValue] = 0;
  }
  ++second[secondValue];
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const first = [];
const second = {};
lines.forEach(parseInput);

const answer = first
  .map((value) => Number(value) * (value in second ? second[value] : 0))
  .reduce((totalScore, score) => totalScore + score, 0);

console.log(answer);
