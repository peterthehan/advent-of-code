const { readFileSync } = require("fs");

const digitToNumber = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};

function convertDigitToNumber(file) {
  Object.keys(digitToNumber).forEach((digit) => {
    const digitRegExp = RegExp(digit, "g");
    file = file.replace(digitRegExp, digitToNumber[digit]);
  });

  return file;
}

function sanitizeLine(line) {
  return line.trim();
}

function parseLineIntoNumber(line) {
  const chars = line.split("");
  const firstNumber = chars.find((char) => !isNaN(char));
  const secondNumber = chars.findLast((char) => !isNaN(char));
  return Number(`${firstNumber}${secondNumber}`);
}

const answer = convertDigitToNumber(readFileSync("./input", "utf8"))
  .split("\n")
  .map(sanitizeLine)
  .map(parseLineIntoNumber)
  .reduce((sum, num) => sum + num, 0);

console.log(answer); // 53340
