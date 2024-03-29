const express=require('express')

const router=express.Router()

const userCon=require('../controller/userCon')
const verifyToken=require('../utils/verifyUsers')

// const 
router.put('/update/:userId',verifyToken.verify,userCon.userUpdate)

module.exports=router