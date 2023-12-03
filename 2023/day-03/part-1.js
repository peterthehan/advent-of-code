const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line, lineIndex) {
  const output = [];

  const parts = line.split(/[^\d]+/).filter(Boolean);
  let startPosition = 0;
  for (const part of parts) {
    const startIndex = line.indexOf(part, startPosition);
    const endIndex = startIndex + part.length;
    startPosition = endIndex;

    output.push({ lineIndex, part: Number(part), startIndex, endIndex });
  }

  return output;
}

function isValidPart(potentialPart) {
  const { lineIndex, startIndex, endIndex } = potentialPart;

  const block = lines
    .slice(Math.max(0, lineIndex - 1), lineIndex + 2)
    .map((line) => line.slice(Math.max(0, startIndex - 1), endIndex + 1));

  return Boolean(block.join("").match(/[^\d.]/));
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const answer = lines
  .flatMap(parseInput)
  .filter(isValidPart)
  .reduce((sum, { part }) => sum + part, 0);

console.log(answer); // 536576
