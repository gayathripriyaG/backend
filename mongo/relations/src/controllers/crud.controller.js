// const getAll = async(model,req,res) => {
//     const items = await model.find()
//     res.status(200).json(items)

// }
// const getOne = async(model,req,res) => {
//   const item = await model.findById(req.params.id)
//   res.status(200).json(item)
// }
//  const createOne = async(model,req,res) => {
//   const item = await model.create(req.body)
//   res.status(200).json(item)
// }
// const updateOne = async(model,req,res) => {
//   const updatedItem = await model.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true} //to return updated info
//   )
//   res.status(200).json(updatedItem)
// }
// const deleteOne = async(model,req,res) => {
//     const deletedItem =await model.findByIdAndDelete(req.params.id)
//     res.status(200).json(deletedItem)
// }

//the above code is also correct but the below one a bit smaller


const getAll = (model) => async(req,res) => {
    const items = await model.find()
    res.status(200).json(items)

}
const getOne = (model) => async(req,res) => {
  const item = await model.findById(req.params.id)
  res.status(200).json(item)
}
 const createOne = (model) => async(req,res) => {
  const item = await model.create(req.body)
  res.status(200).json(item)
}
const updateOne = (model) => async(req,res) => {
  const updatedItem = await model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true} //to return updated info
  )
  res.status(200).json(updatedItem)
}
const deleteOne = (model) => async(req,res) => {
    const deletedItem =await model.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedItem)
}
module.exports = (model) => ({
    post:createOne(model),
    getOne:getOne(model),
    getAll:getAll(model),
    updateOne:updateOne(model),
    deleteOne:deleteOne(model),
})