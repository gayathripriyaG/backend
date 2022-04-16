const express = require("express")
const Section = require("../models/section.model")
const router = express.Router()
const crudController = require("./crud.controller")
const Book = require("../models/book.model")
// router.get("/",async(req,res) => {
//     const sections = await Section.find()
//     res.status(200).json(sections)

// })
// router.get("/:id",async(req,res) => {
//   const section = await Section.findById(req.params.id)
//   res.status(200).json(section)
// })
// router.post("/",async(req,res) => {
//   const createdSection = await Section.create(req.body)
//   res.status(200).json(createdSection)
// })
// router.patch("/",async(req,res) => {
//   const updatedSection = await Section.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true} //to return updated info
//   )
//   res.status(200).json(updatedSection)
// })
// router.delete("/:id",async(req,res) => {
//     const deletedSection =await Section.findByIdAndDelete(req.params.id)
//     res.status(200).json(deletedSection)
// })


//new way compared to others
const controller = crudController(Section)

router.get("/:id",controller.getOne)
router.post("/",controller.post)
router.patch("/",controller.updateOne)
router.get("/",controller.getAll) 
router.delete("/:id",controller.deleteOne)

//get books by id and if in query we add any thing we are doing
//that also to isCheckedOut in query param similar to query we have in books
//it will check by id in books coz we have Book as model
//if we put author there it will check that id in author
router.get("/:id/books",async(req,res) => {
    const {isCheckedOut} = req.query
    let criteria = {
       section: req.params.id
    }
    if(isCheckedOut){
        criteria.isCheckedOut = isCheckedOut
    }
    const items = await Book.find(criteria)
    res.status(200).json(items)
})

module.exports = router