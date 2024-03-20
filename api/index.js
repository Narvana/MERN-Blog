// import dotenv from 'dotenv'
require('dotenv').config();
const express=require('express');
const helmet=require('helmet')
const authRouter=require('./router/authRouter')


const app=express();

app.use(helmet())

app.use(express.json())

const port=process.env.PORT || 5000

require('../api/db/blogDB')

app.use('/api/auth',authRouter)

// app.get('/',(req,res)=>{
//     res.send('Hello')
// }) 
 
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


app.listen(port,()=>{
    console.log(`Connected to port ${port}`); 
}) 
