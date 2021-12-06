import { Board, Coordinate, Direction, Snake } from "../type/game";

export const getMove = (board: Board, you: Snake): Direction => {
  const possibleMoves = getPossibleMoves(board, you);

  return possibleMoves[
    Math.floor(Math.random() * possibleMoves.length)
  ] as Direction;
};

export const getPossibleMoves = (board: Board, you: Snake) => {
  const possibleMoves = ["up", "down", "left", "right"].filter(
    (dir) => !isWall(you.head, dir as Direction, board)
  );

  return possibleMoves;
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
