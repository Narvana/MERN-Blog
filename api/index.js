// import dotenv from 'dotenv'
require('dotenv').config();

const express=require('express');

require('../api/db/blogDB')

const app=express();
const port=process.env.PORT

app.get('/',(req,res)=>{
    res.send('Hello')
}) 
 
app.listen(port,()=>{
    console.log(`Connected to port ${port}`);
}) 