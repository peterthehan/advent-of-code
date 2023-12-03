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

function getGearPositions(potentialPart) {
  const { lineIndex, part, startIndex, endIndex } = potentialPart;

  const lineOffset = Math.max(0, lineIndex - 1);
  const offset = Math.max(0, startIndex - 1);
  const block = lines
    .slice(lineOffset, lineIndex + 2)
    .map((line) => line.slice(offset, endIndex + 1));

  return block.map((line, l) => {
    if (!line.includes("*")) {
      return null;
    }

    const gearIndex = line.indexOf("*") + offset;
    const gearLineIndex = lineOffset + l;

    return { part, gearIndex, gearLineIndex };
  });
}

const lines = readFileSync("./input", "utf8").split("\n").map(sanitizeLine);

const gearToPartMap = lines
  .flatMap(parseInput)
  .flatMap(getGearPositions)
  .filter(Boolean)
  .reduce((gearToPartMap, gearPosition) => {
    const { part, gearIndex, gearLineIndex } = gearPosition;
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
