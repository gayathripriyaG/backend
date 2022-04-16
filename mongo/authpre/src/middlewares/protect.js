const jwt = require("jsonwebtoken")

const User = require("../models/user.model")


const verifyToken = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload) => {
            if(err) return reject(err)


            return resolve(payload)
        })
    })
}

const protect = async(req,rex,next) => {

    //first we need to grt the token
    const bearer = req.headers.authorization

        //all our token starts with Bearer and space
    if(!bearer || !bearer.startsWith("Bearer ")){
        res.status(401).json({status:"failed",message:"email or password is wrong"})
    }


    //we need to verify the token
const token = bearer.split("Bearer ")[1].trim()

//retrieve the user and if user exists then good else bad token
let payload;
try{
  payload = await verifyToken(token)
}catch(e){
    res.status(401).json({status:"failed",message:"email or password is wrong"})
}
let user;

try{
  user = User.findById(payload.id)
}catch(e){
    return res.status(500).json({status:"failed",message:"sth went wrong"})
}

if(!user) {
    return res.status(401).json({status:"failed",message:"email or password is wrong"})

}


req.user = user;
next()

}
    
module.exports = protect;




 








