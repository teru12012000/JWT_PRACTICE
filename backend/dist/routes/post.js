"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const Post_1 = require("../db/Post");
const checkjwt_1 = require("../middleware/checkjwt");
(0, dotenv_1.config)();
exports.post = (0, express_1.default)();
//誰でも用
exports.post.get("/public", (req, res) => {
    res.json(Post_1.publicPosts);
});
//jwtを持っている
exports.post.get("/private", checkjwt_1.middle, (req, res) => {
    res.json(Post_1.privatePosts);
});
