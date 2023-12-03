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

function getGearPositions(potentialPart) {
  const { part, lineIndex, index } = potentialPart;

  const lineOffset = Math.max(0, lineIndex - 1);
  const offset = Math.max(0, index - 1);
  const block = lines
    .slice(lineOffset, lineIndex + 2)
    .map((line) => line.slice(offset, index + part.length + 1));

  return block.map((line, l) => {
    if (!line.includes("*")) {
      return null;
    }

    const gearLineIndex = lineOffset + l;
    const gearIndex = line.indexOf("*") + offset;

    return { part, gearLineIndex, gearIndex };
  });
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const gearToPartMap = lines
  .flatMap(parseInput)
  .flatMap(getGearPositions)
  .filter(Boolean)
  .reduce((gearToPartMap, gearPosition) => {
    const { part, gearLineIndex, gearIndex } = gearPosition;

    const gearKey = `${gearLineIndex}-${gearIndex}`;
    if (!(gearKey in gearToPartMap)) {
      gearToPartMap[gearKey] = [];
    }

    gearToPartMap[gearKey].push(part);

    return gearToPartMap;
  }, {});

const answer = Object.values(gearToPartMap)
  .filter((parts) => parts.length === 2)
  .reduce((sum, parts) => sum + parts[0] * parts[1], 0);

console.log(answer); // 75741499
