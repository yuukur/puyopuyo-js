window.addEventListener("load", () => {
  initialize();
  gameLoop();
});

let gameState;
let frame;
function initialize() {
  GameImage.initialize();
  Stage.initialize();

  gameState = "start";
  frame = 0;
}

function gameLoop() {
  switch (gameState) {
    case "start":
      gameState = "checkFallingPuyo";
      break;
    case "checkFallingPuyo":
      if (Stage.checkFallingPuyo()) {
        gameState = "fallingPuyo";
      } else {
        gameState = "";
      }
      break;
    case "fallingPuyo":
      if (!Stage.fallPuyo()) {
        gameState = "";
      }
      break;
  }
  frame++;
  setTimeout(gameLoop, 1000 / 60);
}
