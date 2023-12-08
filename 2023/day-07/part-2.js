const { readFileSync } = require("fs");

function sanitizeLine(line) {
  return line.trim();
}

const cardValue = {
  A: 13,
  K: 12,
  Q: 11,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
  J: 0,
};

const handValue = {
  5: 7,
  41: 6,
  32: 5,
  311: 4,
  221: 3,
  2111: 2,
  11111: 1,
};

function parseInput(line) {
  const [handString, bidString] = line.split(/\s+/);
  const handMap = handString.split("").reduce((hand, card) => {
    if (!(card in hand)) {
      hand[card] = 0;
    }
    ++hand[card];
    return hand;
  }, {});

  if ("J" in handMap && handMap["J"] !== 5) {
    const jCount = handMap["J"];
    delete handMap["J"];
    const highCount = Math.max(...Object.values(handMap));
    const highCountCard = Object.keys(handMap).find(
      (card) => handMap[card] === highCount
    );
    handMap[highCountCard] += jCount;
  }

  return {
    handValue:
      handValue[
        Object.values(handMap)
          .sort((a, b) => b - a)
          .join("")
      ],
    cardValues: handString.split("").map((card) => cardValue[card]),
    bid: Number(bidString),
  };
}

function compareHands(game1, game2) {
  const { handValue: handValue1 } = game1;
  const { handValue: handValue2 } = game2;
  if (handValue1 !== handValue2) {
    return handValue1 - handValue2;
  }

  const { cardValues: cardValues1 } = game1;
  const { cardValues: cardValues2 } = game2;
  for (let i = 0; i < cardValues1.length; ++i) {
    if (cardValues1[i] !== cardValues2[i]) {
      return cardValues1[i] - cardValues2[i];
    }
  }

  return 0;
}

const answer = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .map(parseInput)
  .sort(compareHands)
  .reduce((sum, input, index) => sum + input.bid * (index + 1), 0);

console.log(JSON.stringify(answer)); // 247885995
