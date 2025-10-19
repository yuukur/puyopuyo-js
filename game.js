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
        gameState = "checkPuyoErase";
      }
      break;
    case "fallingPuyo":
      if (!Stage.fallPuyo()) {
        gameState = "";
      }
      break;
    case "checkPuyoErase":
      const eraseInfo = Stage.checkPuyoErase(frame);
      if (eraseInfo) {
        gameState = "erasingPuyo";
        comboCount++;
      } else {
        comboCount = 0;
        gameState = "";
      }
      break;
    case "erasingPuyo":
      if (!Stage.erasePuyo(frame)) {
        gameState = "checkFallingPuyo";
      }
      break;
  }
  frame++;
  setTimeout(gameLoop, 1000 / 60);
}
