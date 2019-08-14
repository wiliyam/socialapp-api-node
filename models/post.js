const mongoose=require('mongoose')



const postSchema=new mongoose.Schema({
    title:{
        type:String,
        requireed:'title is required',
        minlength:4,
        maxlength:200
    },
    body:{
        type:String,
        requireed:'body is required',
        minlength:4,
        maxlength:2000
    }
})




module.exports=mongoose.model("post",postSchema)