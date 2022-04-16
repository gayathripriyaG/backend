const jwt = require("jsonwebtoken")

const getUserByToken =  (token) => {
return new Promise((resolve,reject) => {
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err) return reject(err)
        resolve(user)
    })
})
}



const authCheck = async (req,res,next) => {
//1.read the req header
const headers = req.headers
//2.get the accesss token fron header
const accessToken = headers.accessToken
//3.if access token is not present then give 400
if(!(accessToken && accessToken.startsWith("Bearer ")) ){
    return res.status(400).send("user doesn't have access to post the product")
}
//3.1 get the user info from token
const token = accessToken.split(" ")[1]

let user ;
try{
    //4.if the token exists then get the user and validate the token
    user =  await getUserByToken(token)
    
    //5.if token matches with user,allow him to go next
} catch(e){
    //6.else 400
    return res.status(400).send("authToken is not valid")
}

req.user = user
return next()

}

module.exports = authCheck