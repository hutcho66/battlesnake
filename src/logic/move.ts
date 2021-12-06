import { Board, Coordinate, Direction, Snake } from "../type/game";

export const getMove = (board: Board, you: Snake): Direction => {
  const possibleMoves = getPossibleMoves(board, you);

  return possibleMoves[
    Math.floor(Math.random() * possibleMoves.length)
  ] as Direction;
};

export const getPossibleMoves = (board: Board, you: Snake) => {
  const possibleMoves = ["up", "down", "left", "right"].filter(
    (dir) =>
      !isWall(you.head, dir as Direction, board) &&
      !isSelfCollision(dir as Direction, you)
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

const isSelfCollision = (direction: Direction, snake: Snake): boolean => {
  switch (direction) {
    case "up":
      return snake.body.some(
        (e) => e.x === snake.head.x && e.y === snake.head.y - 1
      );
    case "left":
      return snake.body.some(
        (e) => e.x === snake.head.x - 1 && e.y === snake.head.y
      );
    case "down":
      return snake.body.some(
        (e) => e.x === snake.head.x && e.y === snake.head.y + 1
      );
    case "right":
      return snake.body.some(
        (e) => e.x === snake.head.x + 1 && e.y === snake.head.y
      );
  }
};
