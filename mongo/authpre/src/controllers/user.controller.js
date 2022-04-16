
const express = require("express");
const User = require("../models/user.model");
const router = express.Router()

const protect = require("../middlewares/protect")

router.get("/",protect,async(req,res) => {
    const users = await User.find({}).select("-password")
    //-password this will not show to the user if we do - i.e not sending password to frontend

    return res.status(200).json({data:users})
})

module.exports = router;