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

  const eliminatedPotentialLoops = possibleMoves.filter(
    (dir) => !isBlockingSelfIn(dir as Direction, board, you)
  );

  if (eliminatedPotentialLoops.length > 0) {
    return eliminatedPotentialLoops;
  } else {
    // Can't avoid loops so just pick a random direction and hope
    // the other snake/s kill themselves first!
    return possibleMoves;
  }
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
  const tail = snake.body.at(-1);
  switch (direction) {
    case "down":
      return snake.body.some(
        (e) =>
          (snake.length < 2 || e !== tail) &&
          e.x === snake.head.x &&
          e.y === snake.head.y - 1
      );
    case "left":
      return snake.body.some(
        (e) =>
          (snake.length < 2 || e !== tail) &&
          e.x === snake.head.x - 1 &&
          e.y === snake.head.y
      );
    case "up":
      return snake.body.some(
        (e) =>
          (snake.length < 2 || e !== tail) &&
          e.x === snake.head.x &&
          e.y === snake.head.y + 1
      );
    case "right":
      return snake.body.some(
        (e) =>
          (snake.length < 2 || e !== tail) &&
          e.x === snake.head.x + 1 &&
          e.y === snake.head.y
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

export const isBlockingSelfIn = (
  direction: Direction,
  board: Board,
  snake: Snake,
  stackDepth = 0
): boolean => {
  // Brute force method, basically make <lengthOfSnake> moves recursively and see
  // if there is a path out. Length of the snake is the maximum stack depth because can
  // always return to where you came in. Naiively assuming there's no fruit in the block.

  if (stackDepth === snake.length) {
    // Return false, as this should propogate up and return false for the whole recursion
    return false;
  }

  // Break condition
  if (
    isWall(direction, board, snake) ||
    isSelfCollision(direction, snake) ||
    isOpponentCollision(direction, board, snake)
  ) {
    // Can't move in this direction, so return true
    return true;
  }

  // Make move in direction of travel
  const newSnake = JSON.parse(JSON.stringify(snake));

  switch (direction) {
    case "up":
      newSnake.head.y++;
      break;
    case "down":
      newSnake.head.y--;
      break;
    case "right":
      newSnake.head.x++;
      break;
    case "left":
      newSnake.head.x--;
      break;
  }
  newSnake.body.pop();
  newSnake.body.unshift(Object.assign(newSnake.head));

  // Get possible moves from new position
  const possibleMoves = ["up", "down", "left", "right"].filter(
    (dir) =>
      !isWall(dir as Direction, board, newSnake) &&
      !isSelfCollision(dir as Direction, newSnake) &&
      !isOpponentCollision(dir as Direction, board, newSnake)
  );

  // For each possible move, recursively check if it is blocking.
  // If any direction is not blocking, we're good to make the move!
  const hasNonBlockingMoveAvailable = possibleMoves.some(
    (dir) =>
      !isBlockingSelfIn(dir as Direction, board, newSnake, stackDepth + 1)
  );

  return !hasNonBlockingMoveAvailable;
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
