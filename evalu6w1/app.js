const express = require("express")
const addresses = require("./address.json")

const app = express()

app.use(express.json()) //middle ware


app.listen(8000,() => {
  console.log("Listening at port 8000")
})

app.get('/',(req,res) => {
  res.json({message:"API is working"})
})

app.get('/api/addresses',(req,res) => {
  res.json(addresses)
})

app.post('/api/addresses',(req,res) => {

  if(!req.body.city || !req.body.state || !req.body.Area || !req.body.flat_no){
    res.status(400)
   return  res.json({error : "please enter thre required details"})
  }
   const postdata = {
     id:addresses.length+1,
     flat_no : req.body.flat_no,
     street : req.body.street,
     landmark:req.body.landmark,
     Area:req.body.Area,
     city:req.body.city,
     pincode:req.body.pincode
   }

   addresses.push(postdata)
   res.json(postdata)
})

app.put('/api/addresses/:id',(req,res) => {
  let id = req.params.id

  let flat_no = req.body.flat_no
  let street = req.body.street
  let landmark = req.body.landmark
  let Area = req.body.Area
  let city = req.body.city
  let pincode = req.body.pincode
 

  let index = addresses.findIndex((address) => {
    return (address.id == Number.parseInt(id))
  })

  if(index >= 0){
     let std = addresses[index]
     std.flat_no=flat_no
     std.street = street
     std.landmark = landmark
     std.Area = Area
     std.city = city
     std.pincode = pincode
     res.json(std)
  }
  else{
    res.status(404)
    res.end()
  }

})

app.delete("/api/addresses/:id",(req,res) => {
  let id = req.params.id
  
  //to search that particular user
  let index = addresses.findIndex((address) => {
    return (address.id == Number.parseInt(id))
  })

  if(index >= 0){

    let std = addresses[index] //user whom we want to delete
    addresses.splice(index,1)
    res.json(std)
  }
  else{
    res.status(404)
    res.end()
  }
})

