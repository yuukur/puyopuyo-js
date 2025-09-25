class Config {
  static puyoImageWidth = 40;
  static puyoImageHeight = 40;

  static stageCols = 6;
  static stageRows = 12;

  static stageBackgroundColor = "#11213b";

  static initialBoard = [
    [0, 1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 0],
    [2, 3, 4, 5, 0, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 2, 0],
    [0, 4, 5, 4, 1, 0],
    [0, 4, 5, 5, 2, 0],
    [0, 4, 3, 3, 3, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 2, 2],
    [0, 0, 2, 2, 0, 0],
    [4, 4, 0, 0, 5, 5],
  ];

  static puyoColorMax = 5;
  static fallingSpeed = 4;
}
