export interface SnakePropertiesResponse {
  apiVersion: string;
  author?: string;
  color?: string;
  head?: string;
  tail?: string;
  version?: string;
}

export interface MoveResponse {
  move: "up" | "down" | "left" | "right";
  shout?: string;
}
