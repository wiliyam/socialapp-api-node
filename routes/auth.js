const express=require('express')
const auth=require('../controller/auth')
const userController=require('../controller/userController')


const router=express.Router()



router.post('/signUp',auth.signUp)
router.post('/signIn',auth.signIn)
router.get('/signOut',auth.signOut)


//any route containing user id app first execute this middleware
router.param("userId",userController.userById)

module.exports=router