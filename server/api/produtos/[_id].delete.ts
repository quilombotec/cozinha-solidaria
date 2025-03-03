export default defineEventHandler(async (event) => {
  try {
    return await ProdutoSchema.findOneAndDelete({ _id: event.context.params?._id })
  }
  catch (error) {
    return error
  }
})
