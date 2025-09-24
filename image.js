class GameImage {
  static puyoImageList = null;

  static initialize() {
    //HTMLからぷよの画像を取得し、配列に格納する
    GameImage.puyoImageList = [];
    for (let i = 0; i < Config.puyoColorMax; i++) {
      const image = document.getElementById("puyo_" + (i + 1));
      image.removeAttribute("id");
      image.width = Config.puyoImageWidth;
      image.height = Config.puyoImageHeight;
      image.style.position = "absolute";
      GameImage.puyoImageList[i] = image;
    }
  }

  static getPuyoImage(color) {
    const image = GameImage.puyoImageList[color - 1].cloneNode(true);
    return image;
  }
}
