const Users=require('../model/userMod')
const bcrypt=require('bcryptjs');
const errorHandler=require('../utils/error')
const secretKey=process.env.SECRET
const jwt=require('jsonwebtoken')

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
        if(existingUser){
            console.log({message:`Username ${username} already exist`});
            next(errorHandler(400,`Username ${username} already exist`))
            // res.status(500).json({message: `${username} username already exist`})
        }
        else{
            try{
                const hashedPassword=bcrypt.hashSync(password)
                const user=new Users({
                    username,
                    email,
                    password:hashedPassword,
                })   
                await user.save()
                // res.status(201).json({userData})
                res.json('Signup Successful');
            } 
            catch(error){
                next(errorHandler(error))
                console.log({error});
            }
        }
    }catch(err)
    {
        res.status(500).json({err})
        console.log({err});
    }
    
}
 
const userLog=async(req,res,next)=>{
    const {username,password}=req.body;
    if(
        !username ||
        !password ||
        username === '' ||
        password === '' 
    ){
        // return res.status(400).json({message:"All field are required"})
        next(errorHandler(400,'All Fields are required'))
    }
    let userExist
    try {
        userExist=await Users.findOne({username})
        if(!userExist)
        {
            console.log(`Username ${username} does not exist`)
            next(errorHandler(401,` Username ${username} does not exist`))
        }
        else
        {
            const checkPassword=bcrypt.compareSync(password,userExist.password)
            if (!checkPassword) {
                console.log(`Wrong Password, Try Again`);
                next(errorHandler(401,`Wrong Password, Try Again`))
              } else {

                const token=jwt.sign({id:userExist._id},secretKey);

                const { password: pass, ...rest }=userExist._doc;

                res.
                status(200)
                .cookie('access_token',token,{
                    httpOnly: true,
                })
                .json({rest})

                console.log(`Welcome to the Web's Blog ${username}`);

              }
        }
    } catch (error) {
        console.log(error);
        next(errorHandler(error))
    }
   
}

module.exports={
    userPost,
    userLog
}