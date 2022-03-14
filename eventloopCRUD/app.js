// const http = require("http")
// const fs = require("fs")

// const postdata = {
//       id: 1001,
//       first_name: "Test First Name",
//       last_name: "Test Last Name",
//       email: "ydalesco0@test.com",
//       gender: "Genderfluid",
//       ip_address: "164.215.194.36",
//       age: 65
// }

// const jsondata = JSON.stringify(postdata)

// const server = http.createServer((req,res) => {
    
//   if(req.url === "/"){
//     res.writeHead(200,{"content-type":"text/html"})
//     res.write("Welcome to the page")
//   }
//   else if(req.url === "/pusers"){
//      fs.appendFile("users.json",jsondata,(err)=>{
//          console.log("post is done")
//      })
//   }
//   else if(req.url === "/gusers"){
//       fs.readFile(`${__dirname}/users.json`,"utf-8",(err,data) => {
//         res.writeHead(200,{"Content-type":"application/json"})
//         console.log(data)
//           res.write(data)
//       })
//   }
//   res.end()
// })

// server.listen(8000,() => {
//     console.log("Starting server 8000")
// })


const express = require("express")
const users = require("./users")

const app = express()

app.use(express.json()) //middle ware

app.listen(8000,() => {
  console.log("Listening at port 8000")
})

app.get('/',(req,res) => {
  res.json({message:"API is working"})
})

app.get('/users',(req,res) => {
  res.json(users)
})

app.post('/users',(req,res) => {

  if(!req.body.email){
    res.status(400)
   return  res.json({error : "email is required ..."})
  }
   const postdata = {
     id:users.length+1,
     first_name : req.body.first_name,
     last_name : req.body.last_name,
     email:req.body.email,
     gender:req.body.gender,
     ip_address:req.body.ip_address,
     age:req.body.age
   }

   users.push(postdata)
   res.json(postdata)
})

app.put('/users/:id',(req,res) => {
  let id = req.params.id

  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let email = req.body.email
  let gender = req.body.gender
  let ip_address = req.body.ip_address
  let age = req.body.age

  let index = users.findIndex((user) => {
    return (user.id == Number.parseInt(id))
  })

  if(index >= 0){
     let std = users[index]
     std.first_name=first_name
     std.last_name = last_name
     std.email = email
     std.gender = gender
     std.age = age
     res.json(std)
  }
  else{
    res.status(404)
    res.end()
  }

})

app.delete("/users/:id",(req,res) => {
  let id = req.params.id
  
  //to search that particular user
  let index = users.findIndex((user) => {
    return (user.id == Number.parseInt(id))
  })

  if(index >= 0){

    let std = users[index] //user whom we want to delete
    users.splice(index,1)
    res.json(std)
  }
  else{
    res.status(404)
    res.end()
  }
})