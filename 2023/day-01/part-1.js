const { readFileSync } = require("fs");

const answer = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .map(parseLineIntoNumber)
  .reduce((sum, num) => sum + num, 0);

console.log(answer); // 52974

function sanitizeLine(line) {
  return line.trim();
}

function parseLineIntoNumber(line) {
  const chars = line.split("");
  const firstNumber = chars.find((char) => !isNaN(char));
  const secondNumber = chars.findLast((char) => !isNaN(char));
  return Number(`${firstNumber}${secondNumber}`);
}
