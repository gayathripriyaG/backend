const express = require("express")
const Book = require("../models/book.model")
const router = express.Router()
const crudController = require("./crud.controller")

// router.get("/",async(req,res) => {
//     const books = await Book.find()
//     res.status(200).json(books)

// }) // this is old way



// router.get("/:id",async(req,res) => {
//   const book = await Book.findById(req.params.id)
//   res.status(200).json(book)
// })



// router.post("/",async(req,res) => {
//   const createdbook = await Book.create(req.body)
//   res.status(200).json(createdbook)
// })



// router.patch("/",async(req,res) => {
//   const updatedbook = await Book.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true} //to return updated info
//   )
//   res.status(200).json(updatedbook)
// })




// router.delete("/:id",async(req,res) => {
//     const deletedbook =await Book.findByIdAndDelete(req.params.id)
//     res.status(200).json(deletedbook)
// })


//this code is applicable when in crud.controller we use the first code
// router.get("/:id",(req,res) => getOne(Book,req,res))
// router.post("/",(req,res) => createOne(Book,req,res))
// router.patch("/",(req,res) => updateOne(Book,req,res))
// router.get("/",(req,res) => getAll(Book,req,res)) //new way
// router.delete("/:id",(req,res) => deleteOne(Book,req,res))




router.get("/:id",crudController(Book).getOne)
router.post("/",crudController(Book).post)
router.patch("/",crudController(Book).updateOne)
//router.get("/",crudController(Book).getAll) 


//this is like a custom request which we are making to find 
//only checkedout books by passing a query in th e url like
//http://localhost:8000?isChecckedOut=true
//as we have multiple query's we can check for multile query's also
//http://localhost:8000?isChecckedOut=true&author=givetheidhere

router.get("/",async(req,res) => {
  const {isCheckedOut,section,author} = req.query;
  let criteria = {} //if theres is n query we get error to avoid that
  if(isCheckedOut){
    criteria.isCheckedOut = isCheckedOut
  }
  if(section){
    criteria.section = section
  }
    
  if(author){
    criteria.authors = author
  }
     const items = await Book.find(criteria)
       res.status(200).json(items)
  
   })

   

router.delete("/:id",crudController(Book).deleteOne)

module.exports = router