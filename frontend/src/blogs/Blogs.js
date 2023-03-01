import { Box, TextField, Button, FormLabel, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllPosts, getPostWithinRadius } from '../api-helpers/helpers'
import BlogItem from './BlogItem'
import { useSelector } from "react-redux";
// import { height } from '@mui/system';

const Blogs = () => {
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  const [areaParams,setAreaParams]=useState({
    location:"",
    distance:""
  })
  const [posts,setPosts]=useState()
  useEffect(()=>{
    getAllPosts().then((data)=>setPosts(data?.data)).catch((err)=>console.log(err))
  },[])

  const handleChange=(e)=>{
    setAreaParams((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
  }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    getPostWithinRadius(areaParams.location,areaParams.distance).then((data)=>setPosts(data?.data)).catch((err)=>console.log(err))
  }
  return (
    <Box display={"flex"} flexDirection="column" position={"relative"}>
      {isLoggedIn && <form onSubmit={handleSubmit}>
      <Box display={"flex"} flexDirection="rows" color="#ff0000">
      <FormLabel sx={{fontFamily:"quicksand",m:"15px",color:"#000000"}}>Posts Within Area :</FormLabel>
          <TextField onChange={handleChange} name='location' variant='outlined' placeholder='Location'  sx={{width:"15%", m:"10px",color:"#000000"}} size="small"/>
          <TextField onChange={handleChange} name='distance' variant='outlined' placeholder='Distance'  sx={{width:"10%", m:"10px",color:"#000000"}} size="small"/>
          <Button type='submit' sx={{width:"8%", height:"5%",m:"10px",mt:"12.5px"}} color="warning" variant='contained' size="small">Search</Button>
      </Box>
      </form>}
      <Box width="80%">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
      {" "}
      {posts && posts.map((item,index)=>(
        <BlogItem date={new Date(`${item.date}`).toLocaleDateString()}
        description={item.description}
        image={process.env.REACT_APP_IMAGE_PATH+item.image}
        id={item._id}
        address={item.address }
        title={item.title}
        dinerName={item.dinerName}
        key={index}
        user={item.user._id}
        name={item.user.name}
        />
      ))}
    </Grid>
    
    </Box>
    <Box width={"20%"} sx={{ml:"1em",height:"100vh",position:"fixed",right:"5px"}}>
        <img src='/offer.jpg' alt=' zomato offer' style={{width:"100%",height:"100%"}}/>
    </Box>
    </Box>
  )
}

export default Blogs





// display={"grid"} 
//     flexDirection={"column"}
//     padding={3}
//     justifyContent="center"
//     alignItems={"center"}