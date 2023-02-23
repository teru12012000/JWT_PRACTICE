import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
type Linkdata={
  link:string;
  title:string;
}
export default function Home() {
  const thispagelink:Linkdata[]=[
    {
      link:"/auth/Login",
      title:"login(ログイン)"
    },{
      
      link:"/auth/Signup",
      title:"Signup(新規登録)"
    },
    
  ]
  return (
    <div 
      className='text-center'
      style={{
        height:"100vh",
        position:"relative"
      }}
    >
      <Head>
        <title>フロントとバックの連携練習</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        style={{
          position:"absolute",
          top:"50%",
          left:"50%",
          transform:"translateY(-50%) translateX(-50%)"
        }}
      >
        <h1>hello</h1>
        <div>
          {thispagelink.map((item:Linkdata,index)=>(
            <div key={index} className="mt-3">
              <Link  href={item.link} style={{textDecoration:"none"}}>
                <Button variant='contained' sx={{width:"100%",fontSize:30}}>{item.title}</Button>
              </Link><br/>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
