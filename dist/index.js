"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const battlesnake_1 = require("./controller/battlesnake");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send((0, battlesnake_1.info)());
});
app.post("/start", (req, res) => {
    const state = req.body;
    res.send((0, battlesnake_1.start)(state));
});
app.post("/move", (req, res) => {
    const state = req.body;
    res.send((0, battlesnake_1.move)(state));
});
app.post("/end", (req, res) => {
    const state = req.body;
    res.send((0, battlesnake_1.end)(state));
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Starting battlesnake at http://localhost:${port}`);
});
