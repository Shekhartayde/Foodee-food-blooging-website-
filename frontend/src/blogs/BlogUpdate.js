import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostDetails, postUpdate } from '../api-helpers/helpers'
import { Box, Button, FormLabel, TextField , Typography, Snackbar, Alert } from '@mui/material'
import RamenDiningTwoToneIcon from '@mui/icons-material/RamenDiningTwoTone';

const BlogUpdate = () => {
    const [open,setOpen]=useState(false)
    const [post,setPost]=useState()
    const [inputs,setInputs]=useState({
        title:"",
        description:"",
        address:"",
        image:"",
        dinerName:""
    })
    const id=useParams().id
    // console.log(id)
    useEffect(()=>{
        getPostDetails(id)
        .then((data)=>{
            setPost(data.data)
            setInputs({
                title:data.data.title,
                description:data.data.description,
                image:data.data.image,
                address:data.data.address,
                dinerName:data.data.dinerName
            })
        })
        .catch((err)=>console.log(err))
    },[id])
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        // console.log(inputs)
        postUpdate(inputs,id).then((data)=>console.log(data)).catch((err)=>console.log(err))
    }
  return (
    <Box display={"flex"}
    flexDirection="column"
    width={"100%"}
    height="100%">
        <Box display={"flex"} margin="auto" padding={2}>
        <Typography variant='h4' fontFamily={"dancing script"}>
            Update Your Food Blog
        </Typography>
        <RamenDiningTwoToneIcon sx={{fontSize:"40px",paddingLeft:1,color:"lightcoral"}}/>
    </Box>
    {post && <form onSubmit={handleSubmit}>
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
            margin='normal' variant='standard'  />
            <FormLabel sx={{fontFamily:"quicksand"}}>Image URL</FormLabel>
            <TextField
            onChange={handleChange}
            name='image'
            value={inputs.image}
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
            onClick={()=>setOpen(true)}
            type='submit'
            color='warning'
            sx={{width:"50%",margin:"auto",mt:2,borderRadius:7}}
            variant='contained'>Update</Button>
        </Box>
    </form>}
    <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
            <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
              Post Updated Successfully !
            </Alert>
          </Snackbar>
    </Box>
  )
}

export default BlogUpdate
