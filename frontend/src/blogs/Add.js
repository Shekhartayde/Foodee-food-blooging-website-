import { Box, Button, FormLabel, TextField , Typography } from '@mui/material'
import React, { useState } from 'react'
import RamenDiningTwoToneIcon from '@mui/icons-material/RamenDiningTwoTone';
import { addPost } from '../api-helpers/helpers';
import { useNavigate } from 'react-router-dom';

function Add() {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        title:"",
        description:"",
        address:"",
        image:"",
        dinerName:""
    })
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onResReceived=(data)=>{
        // console.log(data)
        navigate("/blogs")
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(inputs)
        addPost(inputs).then(onResReceived).catch((err)=>console.log(err))
    }
    const imageUpload=(e)=>{
        console.log(e.target.files[0])
        setInputs({...inputs,image: e.target.files[0]})
    }
  return (
    <Box sx={{display:"flex",flexDirection:"row"}}>
        <Box width={"50%"} component="span">
            <a href="https://www.swiggy.com/">
            <img src='/swiggy.jpg' alt=' swiggy-offer' style={{width:"80%",height:"80%",padding:"2em",paddingTop:"4em"}}/>
            </a>
        
        </Box>
    <Box display={"flex"}
    flexDirection="column"
    width={"50%"}
    height="100%">
        <Box display={"flex"} margin="auto" padding={2}>
        <Typography variant='h4' fontFamily={"dancing script"}>
            Add Your Food Blog
        </Typography>
        <RamenDiningTwoToneIcon sx={{fontSize:"40px",paddingLeft:1,color:"lightcoral"}}/>
    </Box>
    <form encType="multiport/form-data" onSubmit={handleSubmit} >
        <Box padding={3} display="flex" margin={"auto"} flexDirection="column" width={"80%"}>
            <FormLabel sx={{fontFamily:"quicksand"}}>Title</FormLabel>
            <TextField
            onChange={handleChange}
            name='title'
            value={inputs.title}
            margin='normal' 
            variant='standard'  />
            <FormLabel sx={{fontFamily:"quicksand"}}>Description</FormLabel>
            <TextField
            onChange={handleChange}
            name='description'
            value={inputs.description}
            margin='normal' variant='standard'
            inputProps={{ maxLength: 100 }}  />
            <FormLabel sx={{fontFamily:"quicksand"}}>Upload Image</FormLabel>
            <TextField
            type={"file"}
            onChange={imageUpload}
            name='image'
            margin='normal' variant='standard'  />
            <FormLabel sx={{fontFamily:"quicksand"}}>Diner Name</FormLabel>
            <TextField
            onChange={handleChange}
            name='dinerName'
            value={inputs.dinerName}
            margin='normal' variant='standard'  />
            <FormLabel sx={{fontFamily:"quicksand"}}>Address</FormLabel>
            <TextField
            onChange={handleChange}
            name='address'
            value={inputs.address}
            margin='normal' variant='standard'  />
            <Button
            type='submit'
            color='warning'
            sx={{width:"50%",margin:"auto",mt:2,borderRadius:7}}
            variant='contained'>Post</Button>
        </Box>
    </form>
    </Box>
    </Box>
  )
}
export default Add
