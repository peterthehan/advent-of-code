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

let currentNodes = Object.keys(nodes).filter((node) => node.endsWith("A"));
let step = 0;
const stepsToCycle = [];
while (currentNodes.length > 0) {
  const currentInstruction =
    instructions[step % instructions.length] === "L" ? 0 : 1;
  currentNodes = currentNodes.map((node) => nodes[node][currentInstruction]);
  ++step;

  const nextNodes = currentNodes.filter((node) => !node.endsWith("Z"));
  if (currentNodes.length !== nextNodes.length) {
    stepsToCycle.push(step);
  }
  currentNodes = nextNodes;
}

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

const answer = lcmAll(stepsToCycle);

console.log(answer); // 21366921060721
