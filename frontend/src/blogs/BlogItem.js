import {Card, CardContent, CardHeader, Avatar, Typography, IconButton, Box, CardActions, Snackbar, Alert, Grid } from "@mui/material"
import React, { useState } from 'react'
import EditLocationTwoToneIcon from '@mui/icons-material/EditLocationTwoTone';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Link } from "react-router-dom";
import { postDelete } from "../api-helpers/helpers";

const BlogItem = ({title,description,image,address,postingDate,id,dinerName,user,name}) => {

  const [open,setOpen]=useState(false)
    const isLoggedInUser=()=>{
      if(localStorage.getItem("userId")===user){
        return true
      }
      return false
    }
    const handleDelete=()=>{
      postDelete(id).then((data)=>console.log(data)).catch((err)=>console.log(err))
      setOpen(true)
    }
    return (
      <Grid item xs={6}>
        <Card sx={{ width: "90%", height:"65vh", margin:1,padding:2,display:'flex',flexDirection:'column',boxShadow:"2px 2px 5px #ccc" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {name.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <EditLocationTwoToneIcon />
              </IconButton>
            }
            title={title}
            subheader={address}
          />
          <div style={{height:"194px",display:"flex",justifyContent:"center"}}>
          <img
          height={"100%"}
            src={image}
            alt={title}
          />
          </div>
          {/* <img
            height="194px"
            src={image}
            alt={title}
            width={"auto"}
          /> */}
          <CardContent>
            <Typography paddingBottom={1} variant="h6" color="text.secondary">
              {dinerName}
            </Typography>
            <hr />
            <Box 
            paddingTop={1}
            display={'flex'} >
                <Typography width={"17em"} fontWeight={'bold'} variant="caption">{name} :</Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            </Box>
          </CardContent>

          {isLoggedInUser() && <CardActions sx={{marginLeft:'auto'}}>
            <IconButton LinkComponent={Link} to={`/post/${id}`} color="warning">
                <ModeEditTwoToneIcon/>
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
                <DeleteForeverTwoToneIcon/>
            </IconButton>
          </CardActions>}
          <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
            <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
              Post Deleted Successfully !
            </Alert>
          </Snackbar>
        </Card>
        </Grid>
  )
}

export default BlogItem
