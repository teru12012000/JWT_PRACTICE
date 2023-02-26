import { Button } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type Props={
  stateValue?:string|string[]
}
type infomationtype={
  title:string;
  body:string;
}
type HelloResponse={
  message: string|undefined;
  information:infomationtype[]|undefined;
}

const Sucess:NextPage = ({stateValue}:Props) => {
  const router=useRouter();
  const {stateValue:routerStateValue}=router.query;
  const [token,setToken]=useState<string>(stateValue as string||(routerStateValue as string));
  const [show,setShow]=useState<boolean>(false);
  const [mydata,setMydata]=useState<infomationtype[]|undefined>(undefined);
  useEffect(()=>{
    const res=fetch('http://localhost:5050/post/private',{
        method:"GET",
        headers:{
          'Content-Type':'application/json',
          'x-auth-token':token,
        },
      }
    ).then(
      (responce)=>responce.json()
    ).then(
      (item)=>(
        item.message?(setMydata(undefined)):(
          setMydata(item)
        ))
    );
  },[token])
  return (
    <div className="container text-center mt-5">
      {mydata?(
        mydata.map((item:infomationtype,index)=>(
          <div key={index}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
        ))
      ):(<h1>アクセス権限がないぞ！出直して来い！</h1>)}
      <div className="mt-5">
        <Link href="/">
          <Button variant="text">ホームへ</Button>
        </Link>
      </div>
    </div>
  );
}

export default Sucess;