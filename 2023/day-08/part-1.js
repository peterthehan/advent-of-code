const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

const [instructionString, nodeString] = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .join("\n")
  .split("\n\n");

const instructions = instructionString.split("");
const nodes = nodeString.split("\n").reduce((nodes, line) => {
  const [nodeKey, tupleString] = line.split(" = ");
  const pair = tupleString.replace(/\(|\)/g, "").split(", ");
  nodes[nodeKey] = pair;
  return nodes;
}, {});

let currentNode = "AAA";
let step = 0;
while (currentNode !== "ZZZ") {
  const currentInstruction =
    instructions[step % instructions.length] === "L" ? 0 : 1;
  currentNode = nodes[currentNode][currentInstruction];
  ++step;
}

console.log(step); // 20569
