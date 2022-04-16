const mongoose = require("mongoose")


const authorSchema = new mongoose.Schema({
    first_name:{type:String,required:true,unique:true},
    lat_name:{type:String,required:true},
     books:[
        {type:mongoose.Schema.Types.ObjectId,ref:"book",required:true,unique:true}
     ],

})
//unique:true will avoid duplication of books

const Author = mongoose.model("author", authorSchema)

module.exports = Author