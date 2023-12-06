const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line) {
  const [label, numberStrings] = line.split(/:\s+/);
  const numbers = numberStrings.split(/\s+/).filter(Boolean).map(Number);
  return { label: label.toLowerCase(), numbers };
}

function groupRaces(groups, line) {
  line.numbers.forEach((number, index) => {
    if (groups.length < line.numbers.length) {
      groups.push({ [line.label]: number });
    } else {
      groups[index][line.label] = number;
    }
  });
  return groups;
}

function findWins(race) {
  const { time, distance } = race;
  let count = 0;
  for (let i = 0; i <= Math.floor(time / 2); ++i) {
    const traveledDistance = (time - i) * i;
    if (traveledDistance > distance) {
      ++count;
    }
  }

  return count * 2 + (time % 2 ? 0 : -1);
}

const answer = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .map(parseInput)
  .reduce(groupRaces, [])
  .map(findWins)
  .reduce((product, num) => product * num, 1);

console.log(answer); // 1660968
