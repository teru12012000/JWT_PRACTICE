"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const db_1 = require("../db/db");
(0, dotenv_1.config)();
exports.router = (0, express_1.default)();
exports.router.get("/", (req, res) => {
    res.send("Hello World");
});
//新規登録
exports.router.post("/signup", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    //エラーがあるかチェックする
    const error = (0, express_validator_1.validationResult)(req);
    //エラーがあるかどうか
    if (!error.isEmpty()) {
        return res.status(400).json({ massage: error.array() });
    }
    //DBに存在しているか確認(今回はダミーデータ)
    db_1.pool.query("SELECT s FROM users s WHERE s.email = $1", [email], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result.rows.length) {
            return res.status(400).json({
                message: "存在しています。"
            });
        }
        ;
        let hashuedPassword = yield bcrypt_1.default.hash(password, 10);
        //DBへの保存
        db_1.pool.query("INSERT INTO users(email, password) values ($1, $2)", [
            email,
            hashuedPassword
        ], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(500).json({
                    message: "エラーだよん",
                });
            }
            else {
                const token = yield jsonwebtoken_1.default.sign({
                    email,
                }, process.env.KEY, {
                    expiresIn: "24h",
                });
                return res.json({
                    token: token,
                });
            }
        }));
    }));
    //パスワードの暗号化
}));
//ログイン用API
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    db_1.pool.query("SELECT s FROM users s WHERE s.email = $1", [email], (err, result) => {
        if (!result.rows.length) {
            return res.status(400).json({
                message: "存在しません。"
            });
        }
        ;
    });
    db_1.pool.query("SELECT password FROM users s WHERE email = $1", [email], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        const r = result.rows;
        const isMatch = yield bcrypt_1.default.compare(password, r[0].password);
        if (!isMatch) {
            return res.status(400).json({
                message: "パスワードが違うよ。"
            });
        }
        else {
            const token = yield jsonwebtoken_1.default.sign({
                email,
            }, process.env.KEY, {
                expiresIn: "24h",
            });
            return res.json({
                token: token,
            });
        }
        ;
    }));
}));
//ユーザー確認用
exports.router.get("/userlist", (req, res) => {
    db_1.pool.query("SELECT * FROM users", (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.status(200).json(result.rows);
        }
    });
});
