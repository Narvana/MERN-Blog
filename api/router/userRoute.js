const express=require('express')

const router=express.Router()

const userCon=require('../controller/userCon')
const verifyToken=require('../utils/verifyUsers')

// const 
router.put('/update/:userId',verifyToken.verify,userCon.userUpdate)
router.delete('/delete/:userId',verifyToken.verify,userCon.userDelete)
router.post('/signout',userCon.userSignout)

module.exports=router