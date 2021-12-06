export interface BattlesnakeRequest {
  game: Game;
  turn: number;
  board: Board;
  you: Snake;
}

export interface Game {
  id: string;
  ruleset: RuleSet;
  timeout: number;
  source: string;
}

export interface RuleSet {
  name: string;
  version: string;
  settings: RuleSetSettings;
}

export interface RuleSetSettings {
  foodSpawnChance: number;
  minimumFood: number;
  hazardDamagePerTurn: number;
  royale: RoyaleSettings;
  squad: SquadSettings;
}

export interface RoyaleSettings {
  shrinkEveryNTurns: number;
}

export interface SquadSettings {
  allowBodyCollisions: boolean;
  sharedElimination: boolean;
  sharedHealth: boolean;
  sharedLength: boolean;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Snake {
  id: string;
  name: string;
  health: number;
  body: Coordinate[];
  latency: string;
  head: Coordinate;
  length: number;
  shout: string;
  squad: string;
}

export interface Board {
  height: number;
  width: number;
  food: Coordinate[];
  hazards: Coordinate[];
  snakes: Snake[];
}
