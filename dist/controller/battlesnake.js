"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.move = exports.start = exports.info = void 0;
const info = () => {
    return {
        apiVersion: "1",
    };
};
exports.info = info;
const start = (state) => {
    return;
};
exports.start = start;
const move = (state) => {
    return {
        move: "up",
    };
};
exports.move = move;
const end = (state) => {
    return;
};
exports.end = end;
