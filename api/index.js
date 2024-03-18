// import dotenv from 'dotenv'
require('dotenv').config();

const express=require('express');
const helmet=require('helmet')

const app=express();

app.use(helmet())

app.use(express.json())

const port=process.env.PORT || 5000

require('../api/db/blogDB')

const authRouter=require('./router/authRouter')
app.use('/api/auth',authRouter)

app.get('/',(req,res)=>{
    res.send('Hello')
}) 
 
app.listen(port,()=>{
    console.log(`Connected to port ${port}`); 
}) 

app.get('/test',(req,res)=>{

})