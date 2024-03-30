const Users = require('../model/userMod');
const errorHandler=require('../utils/error')
const bcryptjs=require('bcryptjs')

const userUpdate=async(req,res,next)=>{
    // res.send(req.user.id)
    // data=req.user;
    // da=req.params.userId;
    // try {
    //     if(data)
    //     {
    //         console.log(data);
    //         res.json({da,data})
    //     }
    // } catch (error) {
    //     res.send(error)        
    // }

    if(req.user.id !== req.params.userId)
    {
        return next(errorHandler(403,'You are not allowed to update this user'))
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, 'Password must be at least 6 character'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }
    if(req.body.username){
        if(req.body.username.length < 7  || req.body.username.length > 20)
        {
            return next(
                errorHandler(400,'Username must be between 7 and 20 characters')
            );
        }
        if(req.body.username.includes(' '))
        {
            return next(errorHandler(400,'Username cannot contain spaces')) 
        }
        if(req.body.username !== req.body.username.toLowerCase())
        {
            return next(errorHandler(400,'Username must be in Lowercase'))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/))
        {
            return next(
                errorHandler(400,'Username can only contain letters and numbers')
            );
        }
    }
    try {
        const updateUser=await Users.findByIdAndUpdate(req.params.userId,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },
        },
        {new: true}
        );
        const {password, ...rest} = updateUser._doc;
        res.json(rest);
    } catch (error) {
        next(error)
    }
}

module.exports={
    userUpdate
}