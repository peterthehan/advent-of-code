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
  const { round, winningNumbers, myNumbers } = card;

  return {
    round,
    wins: myNumbers.filter((number) => winningNumbers.has(number)).length,
  };
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const originalCards = lines.map(parseInput).map(countWinningNumbers);

const copyOriginalCards = [...originalCards];
let answer = 0;
while (copyOriginalCards.length) {
  const currentCard = copyOriginalCards.pop();
  const { round, wins } = currentCard;
  copyOriginalCards.push(...originalCards.slice(round, round + wins));
  ++answer;
}

console.log(answer); // 23806951
