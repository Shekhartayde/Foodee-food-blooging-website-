import { Box, Button, FormLabel, TextField, Typography, Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendAuthRequest } from '../api-helpers/helpers'
import { authActions } from '../store'

const Auth = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isSignup,setIsSignup]=useState(true)

  const [errMsg,setErrMsg]=useState("")
  const onResReceived=(data)=>{
    if(data.error){
      setOpen(true)
      setErrMsg(data.error)
      return
    }
    if(isSignup){
      localStorage.setItem("userId",data.data._id)
      // console.log(localStorage.getItem("userId"))
    }else{
      console.log(data)
      localStorage.setItem("userId",data.data._id)
      // console.log(localStorage.getItem("userId"))
    }

    dispatch(authActions.login())
    navigate("/profile")
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log(inputs)
    if(isSignup){
      sendAuthRequest(true,inputs)
      .then(onResReceived)
      .catch((err)=>console.log(err))
    }else{
      sendAuthRequest(false,inputs)
      .then(onResReceived)
      .catch((err)=>console.log(err))
    }
  }
  const [open,setOpen]=useState(false)
  const [inputs,setInputs]=useState({name:"",email:"",password:""})
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  return (
    <Box width="40%" 
    borderRadius={10} 
    boxShadow={"5px 5px 10px #ccc"} 
    margin="auto"
    marginTop={10}
    backgroundColor="#ffffff"
    >
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={"column"} width="60%" padding={5} margin="auto">
          <Typography padding={1} variant='h4' textAlign={"center"}>
            {isSignup? "Signup":"Login"}
          </Typography>
          {isSignup && <>
          <FormLabel>
            Name
          </FormLabel>
          <TextField 
          onChange={handleChange}
          value={inputs.name} 
          name="name" 
          margin='normal'/>
          </>}
          <FormLabel>Email</FormLabel>
          <TextField 
          onChange={handleChange}
          type="email" 
          value={inputs.email} 
          name="email" 
          required 
          margin='normal'/>
          <FormLabel>Password</FormLabel>
          <TextField 
          onChange={handleChange}
          value={inputs.password} 
          name="password" 
          type="password"
          placeholder='Must have atleast 6 characters'
          margin='normal'/>
          <Button sx={{mt:2,borderRadius:10}} type='submit' variant='contained'>{isSignup? "Signup":"Login"}</Button>
          <Button onClick={()=>{
            setIsSignup(!isSignup)
          }} 
          sx={{mt:2,borderRadius:10}}  
          variant='outlined'>
            Change to {isSignup? "Login":"Signup"}
          </Button>
        </Box>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
            <Alert onClose={()=>setOpen(false)} severity="error" sx={{ width: '100%' }}>
              {errMsg}
            </Alert>
          </Snackbar>
    </Box>
  )
}

export default Auth
