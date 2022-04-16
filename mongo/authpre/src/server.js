const express = require("express")

const connect = require("./config/db")

const app = express()
app.use(express.json())

const {signup,signin} = require("./controllers/auth.controller")
const userController = require("./controllers/user.controller")

app.post("/signup",signup)
app.post("/signin",signin)

app.use("/users",userController)

const start = async () => {
    await connect();

    app.listen(2244,() => {
        console.log("listening at port 2244")
    })
}

module.exports = start;