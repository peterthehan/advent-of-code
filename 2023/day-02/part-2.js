const { readFileSync } = require("fs");

const answer = readFileSync("./input", "utf8")
  .split("\n")
  .map(sanitizeLine)
  .map(parseLineIntoGame)
  .map(findMinCubeSet)
  .reduce((sum, round) => {
    return (
      sum + Object.values(round).reduce((product, value) => product * value, 1)
    );
  }, 0);

console.log(answer); // 54699

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

function findMinCubeSet(game) {
  return game.rounds.reduce((obj, round) => {
    const colors = Object.keys(round);
    colors.forEach((color) => {
      obj[color] =
        color in obj ? Math.max(obj[color], round[color]) : round[color];
    });
    return obj;
  }, {});
}
