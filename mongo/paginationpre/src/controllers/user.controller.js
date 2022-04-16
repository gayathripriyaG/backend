const express = require("express")
const User = require("../models/user.model")
const router = express.Router()

router.get("/",async(req,res) => {
    const page = req.query.page || 1;  //even if we donot pass page and size in quer we have the default values as 1 and 10.
    const size  = req.query.limit || 10;

    //const {page = 1,size = 10} = req.query   --> this same like above getting and passing default.
   
     const offset = (page-1)*size

    const users = await User.find({}).skip(offset).limit(size).lean().exec()
    //.lean and .exec are  optional

    const totalPages = Math.ceil(await User.find({}).countDocuments().lean().exec())/size
    res.status(200).json({data:{users,totalPages}})
})

router.post("/",async(req,res) => {
    try{
        let currentcount = await User.find().countDocuments();
    let createdUser = await User.create({
        id: currentcount+1,
        ...req.body,
    })
    res.status(200).json(createdUser)
    }
    catch (e){
        console.log(e.message)
        res.status(400).send(e.message)
      
    }
})


module.exports = router