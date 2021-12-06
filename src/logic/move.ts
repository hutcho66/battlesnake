import { Board, Coordinate, Direction, Snake } from "../type/game";

export const getMove = (board: Board, you: Snake): Direction => {
  const possibleDirections = ["up", "down", "left", "right"].filter(
    (dir) => !isWall(you.head, dir as Direction, board)
  );

  return possibleDirections[
    Math.floor(Math.random() * possibleDirections.length)
  ] as Direction;
};

const isWall = (
  position: Coordinate,
  direction: Direction,
  board: Board
): boolean => {
  switch (direction) {
    case "up":
      return position.y == 0;
    case "left":
      return position.x == 0;
    case "down":
      return position.y == board.height - 1;
    case "right":
      return position.x == board.width - 1;
  }
};
