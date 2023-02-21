import { NextFunction } from "connect";
import jwt from "jsonwebtoken";
import {Request,Response} from "express";
import {config} from "dotenv";
import { userdata } from "../db/User";
config({debug:true})
declare global {
  namespace Express {
    interface Request {
      user: string; // or your user type
    }
  }
}
export const middle=async(req:Request,res:Response,next:NextFunction)=>{
  const token=req.header("x-auth-token");
  //console.log(req);
  if(!token){
    res.status(400).json({
      message:"権限がないよー"
    })
  }else{
    try{
      let user =await jwt.verify(token,process.env.KEY as string) as userdata;
      req.user=user.email;
      next();
    }catch(err){
      console.log(err);
      return res.status(400).json(
        {
          message:"一致しないよ"
        }
      )
    }
  }
}