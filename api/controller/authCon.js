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
    // const {}=id

    const {email,password}=req.body;
    
    if(
        !email ||
        !password ||
        email === '' ||
        password === '' 
    ){
        // return res.status(400).json({message:"All field are required"})
        next(errorHandler(400,'All Fields are required')) 
    } 
    let userExist
    try {
        userExist=await Users.findOne({email})
        if(!userExist)
        {
            console.log(`email ${email} does not exist`)
            next(errorHandler(401,` email ${email} does not exist`))
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
                console.log(userExist._doc);
                res
                .status(200)
                .cookie('access_token',token,{
                    httpOnly: true,
                })
                .json({rest})
                console.log(`Welcome to the Web's Blog ${rest.username}`,rest);
              }
        }
    } catch (error) {
        console.log(error);
        next(errorHandler(error))
    }
   
}

const google=async(req,res,next)=>{
    const {email,name, googlePhotoUrl}=req.body;
    try {
        const user=await Users.findOne({email});
        if(user){
            const token=jwt.sign(
                {id:user._id},secretKey);
            const {password, ...rest}= user._doc;
            res
            .status(200)
            .cookie('access_token',token,{
                httpOnly: true,
            }).json(rest);
        } else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword=bcrypt.hashSync(generatePassword,10);
            const newUser = new Users({
                username: name.toLowerCase().split(' ').join('')+ Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();
            const token=jwt.sign({id:newUser._id},secretKey);
            const {password, ...rest}=newUser._doc;
            res
             .status(200)
             .cookie('access_token', token, {
                httpOnly:true,
             })
             .json({rest});
        }
    } catch (error) {
        console.log({error});
        next(errorHandler(error))
    }    
}

module.exports={
    userPost,
    userLog,
    google,
}