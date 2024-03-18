const Users=require('../model/userMod')
const bcrypt=require('bcryptjs');


const userPost=async(req,res)=>{
    const {username,email,password}=req.body;
    if(
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ){
        return res.status(400).json({message:"All field are required"})
    }

    let existingUser
    try{
        existingUser=await Users.findOne({username})
    }catch(error)
    {
        res.json({error}).status(500)
        console.log(error);
    }
    if(existingUser){
        console.log({message: `${username} username already exist`});
        res.json({message: `${username} username already exist`}).status(500)
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
            res.json({userData}).status(201)
        }
        catch(error){
            res.json({error}).status(400)
            console.log(error);
        }
    }
}

module.exports={
    userPost
}