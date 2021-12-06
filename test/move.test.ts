import { Board, Snake } from "../src/type/game";
import { getPossibleMoves } from "../src/logic/move";

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
const board: Board = {
  height: 3,
  width: 3,
  food: [],
  hazards: [],
  snakes: [snake],
};

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