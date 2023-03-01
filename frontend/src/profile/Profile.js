// import { formControlLabelClasses } from '@mui/material'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../api-helpers/helpers'
import BlogItem from '../blogs/BlogItem'
import {useDispatch} from "react-redux"
import {authActions} from "../store"
import {useNavigate} from "react-router-dom"

const Profile = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [user,setUser]=useState()
  useEffect(()=>{
    getUserDetails().then((data)=>setUser(data.user)).catch((err)=>console.log(err))
  },[])

  const handleclick=()=>{
    dispatch(authActions.logout())
    localStorage.removeItem("userId")
    navigate('/')
  }
  return (
    <Box display={"flex"} flexDirection="column">
        {user && <><Typography textAlign={"center"} variant="h3" fontFamily={"dancing script"} padding={2} >
          User Profile
        </Typography>
        <Typography fontFamily={"quicksand"} padding={2} paddingBottom={0} textAlign={"left"}>
          Name: {user.name}
        </Typography>
        <Typography fontFamily={"quicksand"} padding={2} textAlign={"left"}>
          Email: {user.email}
        </Typography>
        <Button
        onClick={handleclick}
        sx={{mr:"auto",width:"12%",ml:"15px"}} 
        color="warning" 
        variant='contained'>
          LOGOUT
        </Button>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} width="60%" sx={{padding:"2em"}}>
          {user.blogs.length===0?
          <Box sx={{ml:'30%',width:"50%"}}><img style={{height:"70s%",opacity:"0.4"}} src='/no_post.jpeg' alt='No-Posts'/></Box>
          :user.blogs.map((post,index)=>(
          <BlogItem 
          key={index}
          title={post.title} 
          description={post.description} 
          id={post._id} 
          image={process.env.REACT_APP_IMAGE_PATH+post.image} 
          address={post.address} 
          dinerName={post.dinerName} 
          user={user._id}
          name={user.name}
          />
          ))}
        </Grid></>}
    </Box>
  )
}

export default Profile
