const jwt =require('jsonwebtoken')


const jwtKey=process.env.JWT_KEY



exports.signToken=async (data)=>{
    
    
    return await jwt.sign(data,jwtKey)
}

exports.verifyToken=async (token)=>{
    return await jwt.verify(token,jwtKey)
}