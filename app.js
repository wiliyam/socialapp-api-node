require('dotenv').config()

const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

const postRoutes=require('./routes/post')

const app=express();
const PORT=process.env.PORT;


mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser: true}).then(()=>{
    console.log('Database successfully connected..')
}).catch((err)=>{
    console.error('Database connection failed:',err)
})

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use("/",postRoutes)




app.listen(PORT,()=>{
    console.log('Server is running on Port:',PORT)
})