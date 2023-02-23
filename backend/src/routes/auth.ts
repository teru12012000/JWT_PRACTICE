import Router,{Request,Response} from "express";
import {body,validationResult} from "express-validator";
import { User } from "../db/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
config({debug:true})




export const router=Router();
router.get("/",(req:Request,res:Response)=>{
  res.send("Hello World")
})
//新規登録
router.post("/signup",body("email").isEmail(),body("password").isLength({min:5}),async(req:Request,res:Response)=>{
  const email:string=req.body.email;
  const password:string=req.body.password;
  //エラーがあるかチェックする
  const error=validationResult(req);
  //エラーがあるかどうか
  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()})
  }
  //DBに存在しているか確認(今回はダミーデータ)
  const user=User.find((user)=>user.email===email);
  if(user){
    return res.status(400).json({
      message:"存在しています。"
    })
  }
  //パスワードの暗号化
  let hashuedPassword:string=await bcrypt.hash(password,10);
  //console.log(hashuedPassword);

  //DBへの保存(本来は違うよ)
  User.push({
    email,
    password:hashuedPassword,
  });
  
  //クライアントへのjwtの発行
  return res.status(200).json({
    message:"サインアップ成功！"
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
})


//ログイン用API
router.post("/login",async(req:Request,res:Response)=>{
  const {email,password}=req.body;
  const user=User.find((user)=>email===user.email);
  if(!user){
    return res.status(400).json({
      message:"存在しません。"
    })
  }
  const isMatch=await bcrypt.compare(password,user.password)
  if(!isMatch){
    return res.status(400).json({
      message:"パスワードが違うよ。"
    })
  };
  const token=await jwt.sign(
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
  });
  
})


//ユーザー確認用
router.get("/userlist",(req:Request,res:Response)=>{
  res.send(User);
})




