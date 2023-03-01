import React, { useState } from 'react'
import {AppBar, Tab, Tabs, Toolbar} from '@mui/material'
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const linksArray=["home","blogs","auth"]
const loggedInLinks=["home","blogs","add","profile"]

const Header = () => {
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)
    const [value,setValue]=useState()
  return (
    <AppBar sx={{bgcolor:"#ffffff",position:'sticky'}}>
        <Toolbar>
            <FastfoodTwoToneIcon sx={{color:"black"}}/>
            <p style={{color:"black",marginLeft:".7em",fontSize:"2em",fontFamily:`'Aboreto', cursive`,fontWeight:"600"}}>
                FooDEE
            </p>

            <Tabs value={value} onChange={(e,val)=>setValue(val)} sx={{ml:"auto",textDecoration:"none"}}>
                {isLoggedIn ? loggedInLinks.map((link)=>
                <Tab 
                LinkComponent={Link}
                to={`/${link==="home" ? "":link}`}
                sx={{textDecoration:"none",":hover":{
                    textDecoration:"underline",
                    textUnderlineOffset:"18px"
                }}} key={link} label={link}/>)
            :
            linksArray.map((link)=>
                <Tab 
                LinkComponent={Link}
                to={`/${link==="home" ? "":link}`}
                sx={{textDecoration:"none",":hover":{
                    textDecoration:"underline",
                    textUnderlineOffset:"18px"
                }}} key={link} label={link}/>)}
            </Tabs>
        </Toolbar>
    </AppBar>
  )
}

export default Header
