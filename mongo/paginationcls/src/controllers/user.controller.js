const express = require("express")
const User = require("../models/user.model")
const router = express.Router()


const upload = require("../utils")
const {body,validationResult} = require("express-validator")

router.get("/",async(req,res) => {
    const page = req.query.page || 1;  //even if we donot pass page and size in quer we have the default values as 1 and 10.
    const size  = req.query.limit || 10;

    //const {page = 1,size = 10} = req.query   --> this same like above getting and passing default.
   
     const offset = (page-1)*size

    const users = await User.find({}).skip(offset).limit(size)
    //.lean and .exec are  optional

    const totalPages = Math.ceil(await User.find({}).countDocuments())/size
    res.status(200).json({data:{users,totalPages}})
})

router.post("/",
body("first_name").isLength({min:3,max:10}).withMessage("First name is required min length is 3 and max length is 10"),
body("last_name").isLength({min:3,max:10}).withMessage("First name is required min length is 3 and max length is 10"),
body("age").isFloat({min:1,max:100}).withMessage("Age is required min age is 1 and max age is 100"),
body("email").isEmail().withMessage("please enter a valid email"),
upload.array('avatar'),


async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        let currentcount = await User.find().countDocuments();
    let createdUser = await User.create({
        id: currentcount+1,
        ...req.body,
        avatar:req.files.map((f) => f.path)
    })
    res.status(200).json(createdUser)
    }
    catch (e){
        console.log(e.message)
        res.status(400).send(e.message)
      
    }
})


module.exports = router