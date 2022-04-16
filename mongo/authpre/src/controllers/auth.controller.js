const jwt = require("jsonwebtoken");
require("dotenv").config()

const User = require("../models/user.model")

const newToken = (user) => {
    return jwt.sign({id:user.id},process.env.JWT_SECRET_KEY)
}



const signup = async(req,res) => {
 
    try{
        const user = await User.create(req.body)
        const token = newToken(user)
        return res.status(201).json({data:{token}})
    }
    catch(e){
        return res.status(500).json({status:"failed",message:"something went wrong"})
    }
    
    
}

const signin = async(req,res) => {
    //we will try to find the user withe email that comes in
    let user;
    try{
         user = await User.findOne({email:req.body.email})

        if(!user) return res.status(401).json({status:"failed",message:"email or password is wrong"})
    }
    catch(e){
        return res.status(500).json({status:"failed",message:"sth went wrong"})
    }

    try{
        //we will try to match the password that user typed with the one in the system

    const match = await user.checkPassword(req.body.password) // checkPassword here is a custom func we made user model
    if(!match) return res.status(401).json({status:"failed",message:"email or password is wrong"})


    } catch(e){
        return res.status(500).json({status:"failed",message:"sth went wrong"})
    }
   
    
   
    //we will create a new token and return the token

    const token = newToken(user)
    return res.status(201).json({data:{token}})
}

module.exports = {signup,signin}


