"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./routes/auth");
require("dotenv/config");
const post_1 = require("./routes/post");
const app = (0, express_1.default)();
const port = 5050;
app.use(express_1.default.json());
app.use("/auth", auth_1.router);
app.use("/post", post_1.post);
app.get('/', (req, res) => {
    res.send("hello");
});
app.listen(port, () => {
    console.log("Let's start!!");
});
