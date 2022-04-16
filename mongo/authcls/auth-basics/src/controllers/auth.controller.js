const express = require("express");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");


const router = express.Router();

const newToken = (user) => {
  return jwt.sign({user},process.env.JWT_SECRET_KEY)
}

router.post("/register", async (req, res) => {
  try {
      //check if email is already registered
      let user = await User.findOne({email:req.body.email})
     
      //if user exists don't create a new user and inform to register with diff email
     
      if(user){
        return res.status(400).json("user alredy exists try diff email")
      }
      //if user doesn't exist create one.
      user = await User.create(req.body)

      let token = newToken(user)
      return res.status(200).json({ token});
    //   return res.status(200).json({ data:user });
  } 
  catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    //select is used to select and de-select/remove fields from find result
    // `-` sign before any field name means this field will not be returned
    //const users = await User.find().select("-password");

    //1.does user exists
    let user = await User.findOne({email:req.body.email})
    //2.if does not then return 400
    if(!user){
      return res.status(400).json("user email or password is wrong")
    }
    //3.if exists then check if password is matching
    const matching = user.checkPassword(req.body.password) //checkPassword is a function in user model
    //4.if not matching then throw 400 again
    if(!matching){
      return res.status(400).json("wrong password ")
    }
    //5.if matching then give them the token
    let token = newToken(user)
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});


module.exports = router;
