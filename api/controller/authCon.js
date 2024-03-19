const Users=require('../model/userMod')
const bcrypt=require('bcryptjs');
const errorHandler=require('../utils/error')
// import errorHandler from '../utils/error' 

const userPost=async(req,res,next )=>{
    const {username,email,password}=req.body;
    if(
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === '' 
    ){
        // return res.status(400).json({message:"All field are required"})
        next(errorHandler(400,'All Fields are required'))
    }

    let existingUser
    try{
        existingUser=await Users.findOne({username})
    }catch(err)
    {
        res.status(500).json({err})
        console.log({err});
    }
    if(existingUser){
        console.log({message:`Username ${username} already exist`});
        res.status(500).json({message: `${username} username already exist`})
    }
    else{
        try{
            const hashedPassword=bcrypt.hashSync(password)
            const user=new Users({
                username,
                email,
                password:hashedPassword,
            })   
            const userData=await user.save()
            // res.status(201).json({userData})
            res.json('Signup Successful');
        } 
        catch(error){
            res.status(400).json({error})
            console.log({error});
        }
    }
}
 
module.exports={
    userPost
}