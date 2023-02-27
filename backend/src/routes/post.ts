import Router,{Request,Response} from "express";
import {config} from "dotenv";
import { privatePosts, publicPosts } from "../db/Post";
import { middle } from "../middleware/checkjwt";

config()
export const post=Router();
//誰でも用
post.get("/public",(req:Request,res:Response)=>{
  res.json(publicPosts);
});
//jwtを持っている
post.get("/private",middle,(req:Request,res:Response)=>{
  res.json(privatePosts);
});






