const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
     //if we add unique as true then the name won't be duplicated
     body:{type:String,required:true},
     authors:[
        {type:mongoose.Schema.Types.ObjectId,ref:"author",required:true}
     ],
     section:{type:mongoose.Schema.Types.ObjectId,ref:"section",required:true},
     isCheckedOut:{type: Boolean,default:false}

})

const Book = mongoose.model("book", bookSchema)

module.exports = Book