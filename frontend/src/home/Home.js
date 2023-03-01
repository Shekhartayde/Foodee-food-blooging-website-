import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const btn1sx={
    mr:2,
    bottom:10,
    color:"#1976d2",
    border:"1px solid #1976d2",
    "&:hover":{
        border:"1px solid white",
        backgroundColor:"#1976d2",
        color:"#e7e7e4"
    }
}
const btn2sx={
    ml:2,
    bottom:10,
    backgroundColor:"#1976d2",
    "&:hover":{
        border:"1px solid #1976d2",
        backgroundColor:"#e7e7e4",
        color:"#1976d2"
    }
}

const Home = () => {
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  return (
    <Box position={'relative'} width="100%" heigth="90vh">
        <img src='/food.jpeg' alt='Foodpic'  width={"100%"} height='70%' />
        <Typography 
        fontFamily={"Dancing Script,cursive"}
        // fontWeight="bold"
        variant='h5' textAlign={'center'} 
        width="100%" color={'white'} 
        sx={{position:"absolute",top:"0px",color:"#fbeeb9"}}>
            <div className='homeImgText'>NOTHING BRINGS PEOPLE TOGETHER LIKE <br/> GOOD FOOD</div>
        </Typography>
        <Box width="100%" 
        height="30%" 
        display={"flex"}
        flexDirection="column">
            <Typography
            fontFamily={"quicksand"}
             textAlign={"center"} variant='h4' padding={4}>
                SHARE YOUR FOOD BLOGS HERE WITH US
            </Typography>
            <Box margin={"auto"}>
                <Button LinkComponent={Link} to={isLoggedIn?"/add":"/auth"} variant='outlined' sx={btn1sx}>
                    Share Your Blog
                </Button>
                <Button LinkComponent={Link} to="/blogs" variant='contained' sx={btn2sx}>
                    View Blogs
                </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default Home
