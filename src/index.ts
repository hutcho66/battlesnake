import express, { Request, Response } from "express";
import { end, info, move, start } from "./controller/battlesnake";
import { BattlesnakeRequest } from "./type/requests";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(info());
});

app.post("/start", (req: Request, res: Response) => {
  const state = req.body as BattlesnakeRequest;
  res.send(start(state));
});

app.post("/move", (req: Request, res: Response) => {
  const state = req.body as BattlesnakeRequest;
  res.send(move(state));
});

app.post("/end", (req: Request, res: Response) => {
  const state = req.body as BattlesnakeRequest;
  res.send(end(state));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Starting battlesnake at http://localhost:${port}`);
});
