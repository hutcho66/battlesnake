import { BattlesnakeRequest } from "../type/requests";
import { MoveResponse, SnakePropertiesResponse } from "../type/responses";

export const info = (): SnakePropertiesResponse => {
  return {
    apiVersion: "1",
    color: "#33cccc",
    head: "bendr",
    tail: "curled",
  };
};

export const start = (state: BattlesnakeRequest): void => {
  return;
};

export const move = (state: BattlesnakeRequest): MoveResponse => {
  return {
    move: "up",
  };
};

export const end = (state: BattlesnakeRequest): void => {
  return;
};
