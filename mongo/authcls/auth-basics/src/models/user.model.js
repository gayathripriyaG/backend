const mongoose = require("mongoose");

const bcrypt = require("bcryptjs") 

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save",function(next) {
  if(!this.isModified("password")) return next();
  const hash = bcrypt.hashSync(this.password,10) //hash is like we cannaot decrypt it. 10 is how many runds of hash it should perform
  this.password = hash;
  return next()

})

userSchema.methods.checkPassword = function(password){
  // console.log("stored password",this.password)
  // console.log("requested password",password)

  return bcrypt.compareSync(password,this.password)
}

const User = mongoose.model("user", userSchema);

module.exports = User;
