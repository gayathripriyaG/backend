const express = require("express")
const mongoose = require("mongoose");
const PORT = 8000;
const cors = require("cors")
const DB_URL = "addthe url"


const authorController = require("./controllers/author.controller")
const sectionController = require("./controllers/section.controller")
const bookController = require("./controllers/book.controller")


const app = express()
app.use(express.json())
app.use(cors())


app.use("/books",bookController)
app.use("/authors",authorController)
app.use("/sections",sectionController)




const connect = () => {
    return mongoose.connect(DB_URL)
}






app.listen(PORT,async() => {
    try{
       await connect()
       console.log("Running on Port:",PORT)
    }  catch (e){
        console.log(e.message)
    }
    
})