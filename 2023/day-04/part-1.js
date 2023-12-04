const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line) {
  const [card, values] = line.split(": ");
  const round = Number(card.replace(/Card\s+/, ""));
  const [winningNumberStrings, myNumberStrings] = values.split(/\s+\|\s+/);
  const winningNumbers = new Set(winningNumberStrings.split(/\s+/).map(Number));
  const myNumbers = myNumberStrings.split(/\s+/).map(Number);

  return { round, winningNumbers, myNumbers };
}

function countWinningNumbers(card) {
  const { winningNumbers, myNumbers } = card;

  return myNumbers.filter((number) => winningNumbers.has(number)).length;
}

function calculatePoints(count) {
  return count === 0 ? 0 : Math.pow(2, count - 1);
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const answer = lines
  .map(parseInput)
  .map(countWinningNumbers)
  .reduce((sum, count) => sum + calculatePoints(count), 0);

console.log(answer); // 20407
