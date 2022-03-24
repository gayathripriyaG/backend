
const express = require("express")
const books = require("./books")
const fs = require("fs")

const app = express()

app.use(express.json()) //middle ware

app.use((req,res,next) => {
  req.api_requested_by = "Gayathri"
  next();
})





app.listen(8000,() => {
  console.log("Listening at port 8000")
})

app.get('/',(req,res) => {
  
  res.json({message:"API is working"})
})

app.get('/books',(req,res) => {
  const api_requested_by = req.api_requested_by;
  res.json({
    api_requested_by: api_requested_by,
    books: books})
})

app.get('/books/:id',(req,res) => {
    let id = req.params.id
    const api_requested_by = req.api_requested_by;

    let needed = books.filter((book) => book.id == Number.parseInt(id))
    res.json({
      api_requested_by: api_requested_by,
      book : needed})
})


app.post('/books',(req,res) => {
const api_requested_by = req.api_requested_by;

   books.push(req.body)
   fs.writeFileSync(`${__dirname}/books.json`,JSON.stringify(books))
   res.json({
    api_requested_by: api_requested_by,  
    books:req.body})
})

app.put('/books/:id',(req,res) => {
  let id = req.params.id
  const api_requested_by = req.api_requested_by;

  let author = req.body.author
  let book_name = req.body.book_name
  let pages = req.body.pages
  let yeear = req.body.yeear
 

  let index = books.findIndex((book) => {
    return (book.id == Number.parseInt(id))
  })

  if(index >= 0){
     let std = books[index]
     std.author=author
     std.book_name = book_name
     std.pages = pages
     std.yeear = yeear
     res.json({
       api_requested_by: api_requested_by,
      std})
  }
  else{
    res.status(404)
    res.end()
  }

})

app.delete("/books/:id",(req,res) => {
  let id = req.params.id
  const api_requested_by = req.api_requested_by;
  
  //to search that particular user
  let index = books.findIndex((book) => {
    return (book.id == Number.parseInt(id))
  })

  if(index >= 0){

    let std = books[index] //user whom we want to delete
    books.splice(index,1)
    res.json({
      api_requested_by: api_requested_by,
      std})
  }
  else{
    res.status(404)
    res.end()
  }
})

app.patch('/books/:id', (req, res) => {
    const api_requested_by = req.api_requested_by;
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Not Found' });
  
    book.author = req.body.author;
    
  
    res.json({api_requested_by: api_requested_by,book});
  });