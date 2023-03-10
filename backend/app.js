import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./router/userRouter.js"
import postRouter from "./router/postRouter.js"
import cors from 'cors'



const app=express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/public',express.static("public"))

app.use('/user',userRouter)
app.use('/post',postRouter)

mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.yxolles.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Connected to database and listening to port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})

