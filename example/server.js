const express = require("express")
const PORT = 8000
const users = require("./user.json")

let app = express()

app.use(express.json()) //global middleware

app.get("/" , (req,res) => {
    res.sendFile(`${__dirname}/index.html`)
})

// app.get("/users" ,(req,res) => {
//     res.sendFile(`${__dirname}/users.html`)
// })

// app.get("/users" ,(req,res) => {
//     res.send("Get all the users")
// })

app.get("/users",(req,res) => {
    res.json(users)
})

app.get("/users/:id",(req,res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === Number.parseInt(id))
    res.json(user)
})

app.post("/users",(req,res) => {
    console.log("Post to users",req.body)
    users.push(req.body)
    res.json(req.body)
})

app.listen(PORT,() => {
    console.log(`listening at port ${PORT}`)
})