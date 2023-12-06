const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

const lines = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .filter(Boolean);

const seeds = lines.shift().replace("seeds: ", "").split(/\s+/).map(Number);

const resourceMap = {};
let resourceKey = "";
for (const line of lines) {
  if (/^\D/.test(line)) {
    const indexOfDash = line.indexOf("-");
    resourceKey = line.slice(0, indexOfDash);
    resourceMap[resourceKey] = [];
  } else {
    const [destination, source, range] = line.split(/\s+/).map(Number);
    resourceMap[resourceKey].push({ destination, source, range });
  }
}

const resourceTypeMap = {
  seed: "soil",
  soil: "fertilizer",
  fertilizer: "water",
  water: "light",
  light: "temperature",
  temperature: "humidity",
  humidity: "location",
};
const resourceTypes = Object.keys(resourceTypeMap);

function inMappingRange({ source, range }, value) {
  return value >= source && value <= source + range;
}

function getDestinationValue(resourceValue, value) {
  if (!resourceValue) {
    return value;
  }

  const delta = resourceValue.destination - resourceValue.source;
  return delta + value;
}

function mapResources(value) {
  let currentValue = value;
  for (const resourceType of resourceTypes) {
    const resourceValue = resourceMap[resourceType].find((r) =>
      inMappingRange(r, currentValue)
    );
    if (resourceValue) {
      currentValue = getDestinationValue(resourceValue, currentValue);
    }
  }

  return currentValue;
}

const pairs = seeds.reduce((arr, number) => {
  if (arr.length === 0 || arr[arr.length - 1].length === 2) {
    arr.push([]);
  }
  arr[arr.length - 1].push(number);
  return arr;
}, []);

const min = Math.min(...pairs.map((pair) => pair[0]));
const max = Math.max(...pairs.map((pair) => pair[0] + pair[1]));

const bounds = pairs.map((pair) => ({
  lower: pair[0],
  upper: pair[0] + pair[1],
}));

let answer = Infinity;
for (let i = min; i < max; ++i) {
  if (bounds.some((bound) => i >= bound.lower && i <= bound.upper)) {
    answer = Math.min(answer, mapResources(i));
  }
}

console.log(answer); // 27992443
