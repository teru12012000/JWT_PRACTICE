import express,{Request,Response} from "express";
import { router } from "./routes/auth";
import 'dotenv/config'
import { post } from "./routes/post";
import cors from "cors";

const app=express();
const port=5050;
app.use(cors());
app.use(express.json())
app.use("/auth",router);
app.use("/post",post);
app.get('/',(req:Request,res:Response)=>{
  res.send("hello");
});

app.listen(port,()=>{
  console.log("Let's start!!")
})