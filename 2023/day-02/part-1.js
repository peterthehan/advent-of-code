const { readFileSync } = require("fs");

const availableColorsMap = {
  red: 12,
  green: 13,
  blue: 14,
};

function sanitizeLine(line) {
  return line.trim();
}

function parseLineIntoGame(line) {
  const [gameLabel, game] = line.split(": ");

  const id = Number(gameLabel.replace("Game ", ""));

  const rounds = game.split("; ").map((g) => {
    const pulls = g.split(", ").reduce((cubes, cubeString) => {
      const [count, color] = cubeString.split(" ");
      cubes[color] = Number(count);
      return cubes;
    }, {});

    return pulls;
  });

  return { id, rounds };
}

function findValidGames(game) {
  return game.rounds.every((round) => {
    const colors = Object.keys(round);
    return colors.every((color) => round[color] <= availableColorsMap[color]);
  });
}

const answer = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .map(parseLineIntoGame)
  .filter(findValidGames)
  .reduce((sum, validGame) => sum + validGame.id, 0);

console.log(answer); // 2593
