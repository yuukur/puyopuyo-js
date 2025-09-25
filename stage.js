class Stage {
  static stageElement = null;

  static puyoBoard = null;
  static puyoCount = 0;
  static fallingPuyoInfoList = [];

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

  static setPuyoInfo(x, y, info) {
    Stage.puyoBoard[y][x] = info;
  }

  static getPuyoInfo(x, y) {
    if (x < 0 || x >= Config.stageCols || y >= Config.stageRows) {
      return {
        puyoColor: -1,
      };
    }
    if (y < 0) {
      return null;
    }
    return Stage.puyoBoard[y][x];
  }
  static removePuyoInfo(x, y) {
    Stage.puyoBoard[y][x] = null;
  }

  static checkFallingPuyo() {
    Stage.fallingPuyoInfoList = [];

    for (let y = Config.stageRows - 2; y >= 0; y--) {
      for (let x = 0; x < Config.stageCols; x++) {
        const currentPuyoInfo = Stage.getPuyoInfo(x, y);
        if (!currentPuyoInfo) {
          continue;
        }
        const belowPuyoInfo = Stage.getPuyoInfo(x, y + 1);
        if (!belowPuyoInfo) {
          Stage.removePuyoInfo(x, y);

          let destination = y;
          while (!Stage.getPuyoInfo(x, destination + 1)) {
            destination++;
          }
          Stage.setPuyoInfo(x, destination, currentPuyoInfo);

          Stage.fallingPuyoInfoList.push({
            element: currentPuyoInfo.image,
            position: y * Config.puyoImageHeight,
            destination: destination * Config.puyoImageHeight,
            falling: true,
          });
        }
      }
    }
    return Stage.fallingPuyoInfoList.length > 0;
  }
  static fallPuyo() {
    let isFalling = false;
    for (const fallingPuyoInfo of Stage.fallingPuyoInfoList) {
      if (!fallingPuyoInfo.falling) {
        continue;
      }
      let position = fallingPuyoInfo.position;
      position += Config.fallingSpeed;

      if (position >= fallingPuyoInfo.destination) {
        position = fallingPuyoInfo.destination;
        fallingPuyoInfo.falling = false;
      } else {
        isFalling = true;
      }
      fallingPuyoInfo.position = position;
      fallingPuyoInfo.element.style.top = position + "px";
    }
    return isFalling;
  }
}
