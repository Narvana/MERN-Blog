const express=require('express')

const router=express.Router()

const authcon=require('../controller/authCon')


router.post('/signup',authcon.userPost)
router.post('/signin',authcon.userLog)
router.post('/google',authcon.google)

module.exports=router