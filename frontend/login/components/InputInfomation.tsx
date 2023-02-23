import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
type Props={
  title:string;
  email:Dispatch<SetStateAction<string>>;
  password:Dispatch<SetStateAction<string>>;
  clickfunction:()=>void;
}
const InputInfomation:FC<Props> = ({title,email,password,clickfunction}) => {
  const [show,setShow]=useState<boolean>(false);
  const handlechangeemail=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    email(e.currentTarget.value);
  }
  const handleClickShowPassword = () => setShow((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handlechangepassword=(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    password(e.currentTarget.value);
  }
  return (
    <section
      style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translateY(-50%) translateX(-50%)"
      }}
    >
      <h1>{title}</h1>
      <div>
        <TextField 
          id="outlined-basic" 
          label="mail adress" 
          variant="outlined"
          onChange={(e)=>handlechangeemail(e)}
        /><br/>
        <FormControl sx={{ m: 1,width:"80%"}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={show? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {show? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e)=>handlechangepassword(e)}
          />
        </FormControl><br/>
        <Button variant="contained" onClick={clickfunction}>{title}</Button>
      </div>
    </section>
    
  );
}

export default InputInfomation;