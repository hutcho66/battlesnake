import { Board, Direction, Snake } from "../type/game";

export const getMove = (board: Board, you: Snake): Direction => {
  const possibleMoves = getPossibleMoves(board, you);

  const move = possibleMoves[
    Math.floor(Math.random() * possibleMoves.length)
  ] as Direction;

  return move;
};

export const getPossibleMoves = (board: Board, you: Snake) => {
  const possibleMoves = ["up", "down", "left", "right"].filter(
    (dir) =>
      !isWall(dir as Direction, board, you) &&
      !isSelfCollision(dir as Direction, you) &&
      !isOpponentCollision(dir as Direction, board, you)
  );

  return possibleMoves;
};

const isWall = (direction: Direction, board: Board, snake: Snake): boolean => {
  switch (direction) {
    case "down":
      return snake.head.y == 0;
    case "left":
      return snake.head.x == 0;
    case "up":
      return snake.head.y == board.height - 1;
    case "right":
      return snake.head.x == board.width - 1;
  }
};

const isSelfCollision = (direction: Direction, snake: Snake): boolean => {
  switch (direction) {
    case "down":
      return snake.body.some(
        (e) => e.x === snake.head.x && e.y === snake.head.y - 1
      );
    case "left":
      return snake.body.some(
        (e) => e.x === snake.head.x - 1 && e.y === snake.head.y
      );
    case "up":
      return snake.body.some(
        (e) => e.x === snake.head.x && e.y === snake.head.y + 1
      );
    case "right":
      return snake.body.some(
        (e) => e.x === snake.head.x + 1 && e.y === snake.head.y
      );
  }
};

const isOpponentCollision = (
  direction: Direction,
  board: Board,
  snake: Snake
): boolean => {
  switch (direction) {
    case "down":
      return board.snakes.some((otherSnake) => {
        if (otherSnake.id === snake.id) return false;
        return otherSnake.body.some(
          (e) => e.x === snake.head.x && e.y === snake.head.y - 1
        );
      });
    case "left":
      return board.snakes.some((otherSnake) => {
        if (otherSnake.id === snake.id) return false;
        return otherSnake.body.some(
          (e) => e.x === snake.head.x - 1 && e.y === snake.head.y
        );
      });
    case "up":
      return board.snakes.some((otherSnake) => {
        if (otherSnake.id === snake.id) return false;
        return otherSnake.body.some(
          (e) => e.x === snake.head.x && e.y === snake.head.y + 1
        );
      });
    case "right":
      return board.snakes.some((otherSnake) => {
        if (otherSnake.id === snake.id) return false;
        return otherSnake.body.some(
          (e) => e.x === snake.head.x + 1 && e.y === snake.head.y
        );
      });
  }
};
