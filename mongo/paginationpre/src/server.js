const express = require("express")
const app = express()

app.use(express.json())
const connect = require("./config/db")


const usersController = require("./controllers/user.controller")

app.use("/users",usersController) //all the api which starts with /users should go to usersController

const start = async () => {
    await connect()


    app.listen(2244,() => {
        console.log("listening on Port 2244")
    })
}


module.exports = start