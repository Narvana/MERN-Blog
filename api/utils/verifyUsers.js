const jwt=require('jsonwebtoken');
const errorHandler=require('../utils/error')
const secretKey=process.env.SECRET

const verify = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token)
    {
        return next(errorHandler(401,'Unauthorized')) 
    }
    jwt.verify(token, secretKey, (err, user) =>{
        if(err){
        return next(errorHandler(401, 'Unauthorised'))
        }
        req.user=user;
        next();
    });
}

module.exports={
    verify,
}