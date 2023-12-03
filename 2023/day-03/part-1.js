const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

function parseInput(line, lineIndex) {
  let startPosition = 0;
  return line
    .split(/[^\d]+/)
    .filter(Boolean)
    .map((part) => {
      const index = line.indexOf(part, startPosition);
      startPosition = index + part.length;

      return { part, lineIndex, index };
    });
}

function isValidPart(potentialPart) {
  const { part, lineIndex, index } = potentialPart;

  const lineOffset = Math.max(0, lineIndex - 1);
  const offset = Math.max(0, index - 1);
  const block = lines
    .slice(lineOffset, lineIndex + 2)
    .map((line) => line.slice(offset, index + part.length + 1));

  return Boolean(block.join("").match(/[^\d.]/));
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const answer = lines
  .flatMap(parseInput)
  .filter(isValidPart)
  .reduce((sum, { part }) => sum + Number(part), 0);

console.log(answer); // 536576
