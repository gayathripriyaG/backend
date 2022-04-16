const express = require("express")
const Author = require("../models/author.model")
const Book = require("../models/book.model")
const router = express.Router()
const crudController = require("./crud.controller")

// router.get("/",async(req,res) => {
//     const authors = await Author.find()
//     res.status(200).json(authors)

// })
// router.get("/:id",async(req,res) => {
//   const author = await Author.findById(req.params.id)
//   res.status(200).json(author)
// })
// router.post("/",async(req,res) => {
//   const createdAuthor = await Author.create(req.body)
//   res.status(200).json(createdAuthor)
// })
// router.patch("/",async(req,res) => {
//   const updatedAuthor = await Author.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true} //to return updated info
//   )
//   res.status(200).json(updatedAuthor)
// })
// router.delete("/:id",async(req,res) => {
//     const deletedAuthor =await Author.findByIdAndDelete(req.params.id)
//     res.status(200).json(deletedAuthor)
// })

router.get("/:id",crudController(Author).getOne)
router.post("/",crudController(Author).post)
router.patch("/",crudController(Author).updateOne)
router.get("/",crudController(Author).getAll) 
router.delete("/:id",crudController(Author).deleteOne)

// custom api to get all the books written by author
router.get("/:id/books",async(req,res) => {
      //  const item = await Author.findById(req.params.id)
      //  res.status(200).json(item)
      const books = await Book.find({
        authors:req.params.id
      })
      res.status(200).json(books)
     })


     //to add the books for author
router.patch("/:id/books" ,async(req,res) => {
  const updatedItem = await Author.findByIdAndUpdate(req.params.id,{
    $push:{books:req.body.books} //since it is array and we just want to update new data without changing prev data in that array
  })
  res.status(200).json(updatedItem)
})
module.exports = router