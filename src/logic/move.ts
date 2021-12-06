import { Board, Direction, Snake } from "../type/game";

export const getMove = (board: Board, you: Snake): Direction => {
  console.log(`board: ${JSON.stringify(board)}`);
  console.log(`snake: ${JSON.stringify(you)}`);

  const possibleMoves = getPossibleMoves(board, you);

  console.log(`possibleMoves: ${JSON.stringify(possibleMoves)}`);

  const move = possibleMoves[
    Math.floor(Math.random() * possibleMoves.length)
  ] as Direction;

  console.log(`moving: ${move}`);

  return move;
};

export const getPossibleMoves = (board: Board, you: Snake) => {
  const possibleMoves = ["up", "down", "left", "right"].filter(
    (dir) =>
      !isWall(dir as Direction, board, you) &&
      !isSelfCollision(dir as Direction, you)
  );

  return possibleMoves;
};

const isWall = (direction: Direction, board: Board, snake: Snake): boolean => {
  switch (direction) {
    case "up":
      return snake.head.y == 0;
    case "left":
      return snake.head.x == 0;
    case "down":
      return snake.head.y == board.height - 1;
    case "right":
      return snake.head.x == board.width - 1;
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
