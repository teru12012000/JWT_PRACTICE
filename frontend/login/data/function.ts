import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type HelloResponse={
  message: string|undefined;
  token:string|undefined;
}

export const signup=async(
  email:string,
  password:string,
  router:NextRouter,
)=>{

  const responce=await fetch('http://localhost:5050/auth/signup',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      "email":email,
      "password":password,
    })
  });
  
  const data:HelloResponse=await responce.json();
  console.log(data)
  if(data.token){
    router.push(`/Success?stateValue=${data.token}`);
  }else{
    window.alert(data.message);
  }
}

export const login=()=>{

}