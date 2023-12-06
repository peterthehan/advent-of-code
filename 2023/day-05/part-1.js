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

const answer = Math.min(...seeds.map(mapResources));

console.log(answer); // 379811651
