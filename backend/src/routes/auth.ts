import Router,{Request,Response} from "express";
import {body,validationResult} from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
import { pool } from "../db/db";
config()
type data1={
  password:string;
}



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
    return res.status(400).json({massage:error.array()})
  }
  //DBに存在しているか確認(今回はダミーデータ)
  
    pool.query("SELECT s FROM users s WHERE s.email = $1",[email],async(err,result)=>{
      if(result.rows.length){
        return res.status(400).json({
          message:"存在しています。"
        })
      };
      let hashuedPassword:string=await bcrypt.hash(password,10);
      //DBへの保存
      pool.query("INSERT INTO users(email, password) values ($1, $2)",[
        email,
        hashuedPassword
      ],async(err,result)=>{
        if(err){
          return res.status(500).json({
            message:"エラーだよん",
          })
        }else{
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
        }
      })
    });
    //パスワードの暗号化
    
  
    
})


//ログイン用API
router.post("/login",async(req:Request,res:Response)=>{
  const {email,password}=req.body;
  pool.query("SELECT s FROM users s WHERE s.email = $1",[email],(err,result)=>{
    if(!result.rows.length){
      return res.status(400).json({
        message:"存在しません。"
      })
    };
  });
  pool.query("SELECT password FROM users s WHERE email = $1",[email],async(err,result)=>{
    const r:data1[]=result.rows
    const isMatch=await bcrypt.compare(password, r[0].password);
    if(!isMatch){
      return res.status(400).json({
        message:"パスワードが違うよ。"
      })
    }else{
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
    };
  });
})


//ユーザー確認用
router.get("/userlist",(req:Request,res:Response)=>{
  pool.query("SELECT * FROM users",(err,result)=>{
    if(err){
      throw err;
    }else{
      res.status(200).json(result.rows);
    }
  })
})




