import { Board, Snake } from "../src/type/game";
import {
  getClosestFoodDirection,
  getMove,
  getPossibleMoves,
  isBlockingSelfIn,
} from "../src/logic/move";

const snake: Snake = {
  id: "1",
  name: "",
  health: 1,
  body: [{ x: 1, y: 1 }],
  latency: "1",
  head: { x: 1, y: 1 },
  length: 1,
  shout: "",
  squad: "",
};
const opponentSnake: Snake = {
  id: "2",
  name: "",
  health: 1,
  body: [],
  latency: "1",
  head: { x: 1, y: 1 },
  length: 1,
  shout: "",
  squad: "",
};
const board: Board = {
  height: 3,
  width: 3,
  food: [],
  hazards: [],
  snakes: [snake, opponentSnake],
};

beforeEach(() => {
  // Reset snakes
  snake.head = { x: 1, y: 1 };
  snake.body = [{ x: 1, y: 1 }];

  opponentSnake.head = { x: 1, y: 1 };
  opponentSnake.body = [];
});

describe("avoids walls", () => {
  it("should avoid going down or left if head at bottom or left", () => {
    snake.head = { x: 0, y: 0 };
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("down");
    expect(possibleMoves).not.toContain("left");
  });

  it("should avoid going up or right if head at top or right", () => {
    snake.head = { x: board.width - 1, y: board.height - 1 };
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("up");
    expect(possibleMoves).not.toContain("right");
  });
});

describe("avoids self", () => {
  it("should avoid going up if body above", () => {
    snake.head = { x: 1, y: 1 };
    snake.body = [snake.head, { x: 1, y: 2 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("up");
  });

  it("should avoid going down if body below", () => {
    snake.head = { x: 1, y: 1 };
    snake.body = [snake.head, { x: 1, y: 0 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("down");
  });

  it("should avoid going left if body left", () => {
    snake.head = { x: 1, y: 1 };
    snake.body = [snake.head, { x: 0, y: 1 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("left");
  });

  it("should avoid going right if body right", () => {
    snake.head = { x: 1, y: 1 };
    snake.body = [snake.head, { x: 2, y: 1 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("right");
  });
});

describe("avoids other snakes", () => {
  it("should avoid going up if other snake above", () => {
    snake.head = { x: 1, y: 1 };
    opponentSnake.body = [{ x: 1, y: 2 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("up");
  });

  it("should avoid going down if other snake below", () => {
    snake.head = { x: 1, y: 1 };
    opponentSnake.body = [{ x: 1, y: 0 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("down");
  });

  it("should avoid going left if other snake left", () => {
    snake.head = { x: 1, y: 1 };
    opponentSnake.body = [{ x: 0, y: 1 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("left");
  });

  it("should avoid going right if other snake right", () => {
    snake.head = { x: 1, y: 1 };
    opponentSnake.body = [{ x: 2, y: 1 }];
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("right");
  });
});

describe("gets direction to closest food", () => {
  it("if single food available, move towards it", () => {
    snake.head = { x: 0, y: 0 };
    board.food = [{ x: 2, y: 2 }];
    const foodDirection = getClosestFoodDirection(board, snake);
    const move = getMove(board, snake);

    expect(new Set(foodDirection)).toEqual(new Set(["up", "right"]));
    expect(["up", "right"]).toContain(move);
  });

  it("if multiple food available, move towards closest one", () => {
    snake.head = { x: 1, y: 0 };
    board.food = [
      { x: 0, y: 0 },
      { x: 2, y: 2 },
    ];
    const foodDirection = getClosestFoodDirection(board, snake);
    const move = getMove(board, snake);

    expect(new Set(foodDirection)).toEqual(new Set(["left"]));
    expect(move).toEqual("left");
  });

  it("if path to closest food blocked, move randomly in possible directions", () => {
    snake.head = { x: 2, y: 0 };
    board.food = [{ x: 0, y: 0 }];
    opponentSnake.body = [{ x: 1, y: 0 }];
    const foodDirection = getClosestFoodDirection(board, snake);
    const move = getMove(board, snake);

    expect(new Set(foodDirection)).toEqual(new Set(["left"]));
    expect(move).toEqual("up");
  });
});

describe("avoids blocking self in", () => {
  it("blocked in by walls", () => {
    snake.head = { x: 1, y: 0 };
    snake.body = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ];
    snake.length = 5;
    const moves = getPossibleMoves(board, snake);

    expect(moves).not.toContain("left");
  });

  it("picks randomly if all moves are blocked in", () => {
    snake.head = { x: 0, y: 1 };
    snake.body = [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    snake.length = 6;
    const blocked = isBlockingSelfIn("down", board, snake);

    expect(blocked).toBe(false);
  });
});
