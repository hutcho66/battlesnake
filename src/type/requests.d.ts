import { Game, Board, Snake } from "./game";
export interface BattlesnakeRequest {
  game: Game;
  turn: number;
  board: Board;
  you: Snake;
}
