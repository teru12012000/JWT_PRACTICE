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
const User_1 = require("../db/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ debug: true });
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
        return res.status(400).json({ errors: error.array() });
    }
    //DBに存在しているか確認(今回はダミーデータ)
    const user = User_1.User.find((user) => user.email === email);
    if (user) {
        return res.status(400).json({
            message: "存在しています。"
        });
    }
    //パスワードの暗号化
    let hashuedPassword = yield bcrypt_1.default.hash(password, 10);
    //console.log(hashuedPassword);
    //DBへの保存(本来は違うよ)
    User_1.User.push({
        email,
        password: hashuedPassword,
    });
    //クライアントへのjwtの発行
    return res.status(200).json({
        message: "サインアップ成功！"
    });
    /*const token=await jwt.sign(
      {
        email,
      },
      process.env.KEY as string,
      {
        expiresIn:"24h",
      }
    );
    return res.json({
      token:token,
    });*/
}));
//ログイン用API
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = User_1.User.find((user) => email === user.email);
    if (!user) {
        return res.status(400).json({
            message: "存在しません。"
        });
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "パスワードが違うよ。"
        });
    }
    ;
    const token = yield jsonwebtoken_1.default.sign({
        email,
    }, process.env.KEY, {
        expiresIn: "24h",
    });
    return res.json({
        token: token,
    });
}));
//ユーザー確認用
exports.router.get("/userlist", (req, res) => {
    res.send(User_1.User);
});
