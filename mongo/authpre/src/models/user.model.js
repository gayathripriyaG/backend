const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8}
},
{timestamps:true}
)




//this is a presaved hook and is kind of a amiddleware that mongoose is providing us
//so whenever we are saving sth before saving please do this and save it then
//so here hash the password before saving it  here we are using bcrypt library for hashing
userSchema.pre("save",function(next) { 
  if(!this.isModified("password")) return next()


 bcrypt.hash(this.password,8,(err,hash) => {
     if(err) return next(err);

     this.password = hash;
     next()
 })

})


//this is like our custon function to check password
userSchema.methods.checkPassword = function () {
    const passwordHash = this.password
    return new Promise((resolve,reject) => {
        bcrypt.compare(password,passwordHash,(err,same) => {
            if(err) return reject(err)

            resolve(same)
        })
    })
}

const User = mongoose.model("user",userSchema)
module.exports = User;