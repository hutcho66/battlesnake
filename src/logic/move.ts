import { Board, Coordinate, Direction, Snake } from "../type/game";

export const getMove = (board: Board, you: Snake): Direction => {
  const possibleMoves = getPossibleMoves(board, you);
  const directionToFood = getClosestFoodDirection(board, you);

  const intersectionOfMoves = directionToFood.filter((dir) =>
    possibleMoves.includes(dir)
  );

  let movesToChooseFrom;
  if (intersectionOfMoves.length > 0) {
    movesToChooseFrom = intersectionOfMoves;
  } else {
    // Just choose a random possible move
    movesToChooseFrom = possibleMoves;
  }

  const move = movesToChooseFrom[
    Math.floor(Math.random() * movesToChooseFrom.length)
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

export const getClosestFoodDirection = (board: Board, snake: Snake) => {
  let minDistanceToFood = Infinity;
  let closestFoodLocation: Coordinate;

  if (board.food.length === 0) {
    return [];
  }

  for (let foodLocation of board.food) {
    const distanceToFood =
      Math.abs(snake.head.x - foodLocation.x) +
      Math.abs(snake.head.y - foodLocation.y);
    if (distanceToFood < minDistanceToFood) {
      closestFoodLocation = foodLocation;
      minDistanceToFood = distanceToFood;
    }
  }

  let returnValue = [];

  if (closestFoodLocation!.x < snake.head.x) {
    returnValue.push("left");
  } else if (closestFoodLocation!.x > snake.head.x) {
    returnValue.push("right");
  }

  if (closestFoodLocation!.y < snake.head.y) {
    returnValue.push("down");
  } else if (closestFoodLocation!.y > snake.head.y) {
    returnValue.push("up");
  }

  return returnValue as Direction[];
};
