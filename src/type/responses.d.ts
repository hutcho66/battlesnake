import { Direction } from "./game";

export interface SnakePropertiesResponse {
  apiVersion: string;
  author?: string;
  color?: string;
  head?: string;
  tail?: string;
  version?: string;
}

export interface MoveResponse {
  move: Direction;
  shout?: string;
}
