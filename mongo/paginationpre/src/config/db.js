const mongoose = require("mongoose")

const connect = () => {
   return mongoose.connect("mongodb://localhost:27017/pagination",{
    useNewUrlParser:true,
    useUnifinedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
})
}
module.exports = connect

//the pagination in the url is the db name which has the collection where our data is stored.