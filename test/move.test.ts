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
  it("should avoid going up if head at top or left", () => {
    snake.head = { x: 0, y: 0 };
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("up");
    expect(possibleMoves).not.toContain("left");
  });

  it("should avoid going down if head at bottom", () => {
    snake.head = { x: board.width - 1, y: board.height - 1 };
    const possibleMoves = getPossibleMoves(board, snake);

    expect(possibleMoves).not.toContain("down");
    expect(possibleMoves).not.toContain("right");
  });
});
