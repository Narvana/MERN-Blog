const mongoose=require('mongoose')
require('dotenv').config
const uri=process.env.URI

mongoose.connect(uri).
then(()=>{
    console.log('Mongodb Connected');
}).catch((error)=>{
    console.log({error});
})
