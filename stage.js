class Stage {
  static stageElement = null;

  static puyoBoard = null;
  static puyoCount = 0;

  static initialize() {
    //HTMLからステージの元になる要素を取得し、大きさを設定する
    Stage.stageElement = document.getElementById("stage");
    Stage.stageElement.style.width =
      Config.puyoImageWidth * Config.stageCols + "px";
    Stage.stageElement.style.height =
      Config.puyoImageHeight * Config.stageRows + "px";
    Stage.stageElement.style.backgroundColor = Config.stageBackgroundColor;

    Stage.puyoCount = 0;
    Stage.puyoBoard = [];
    for (let y = 0; y < Config.stageRows; y++) {
      Stage.puyoBoard[y] = [];
      for (let x = 0; x < Config.stageCols; x++) {
        Stage.puyoBoard[y][x] = null;
      }
    }

    for (let y = 0; y < Config.stageRows; y++) {
      for (let x = 0; x < Config.stageCols; x++) {
        let puyoColor = 0;
        if (Config.initialBoard && Config.initialBoard[y][x]) {
          puyoColor = Config.initialBoard[y][x];
        }
        if (puyoColor >= 1 && puyoColor <= Config.puyoColorMax) {
          Stage.createPuyo(x, y, puyoColor);
        }
      }
    }
  }
  static createPuyo(x, y, puyoColor) {
    const puyoImage = GameImage.getPuyoImage(puyoColor);
    puyoImage.style.left = x * Config.puyoImageWidth + "px";
    puyoImage.style.top = y * Config.puyoImageHeight + "px";
    puyoImage.style.zIndex = Stage.puyoCount;
    Stage.stageElement.appendChild(puyoImage);
    Stage.puyoBoard[y][x] = {
      color: puyoColor,
      image: puyoImage,
    };
    Stage.puyoCount++;
  }
}
