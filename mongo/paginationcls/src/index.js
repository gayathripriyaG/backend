const express = require("express")
const app = express()

app.use(express.json())
const connect = require("./config/db")


const usersController = require("./controllers/user.controller")

app.use("/users",usersController) //all the api which starts with /users should go to usersController




    app.listen(2244, async() => {
        try{
            await connect()
            console.log("listening on Port 2244")
        }
        catch(e){
            console.log(e.message)
        }
        
    })



module.exports = start

