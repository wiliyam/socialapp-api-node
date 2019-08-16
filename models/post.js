const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema



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
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    postedBy:{
        type:ObjectId,
        ref:"user"
    },
    created:{
        type:Date,
        default:Date.now
    }
})




module.exports=mongoose.model("post",postSchema)