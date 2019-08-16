const express=require('express')
const user=require('../controller/user')
const { requireSignIn } = require("../controller/auth");


const router=express.Router()




router.get('/users',user.allUser)
router.get('/user/:userId',requireSignIn,user.getUser)
router.put('/user/:userId',requireSignIn,user.hasAuthorization,user.updateUser)
router.delete('/user/:userId',requireSignIn,user.hasAuthorization,user.removeUser)


//any route containing user id app first execute this middleware
router.param("userId",user.userById)

module.exports=router