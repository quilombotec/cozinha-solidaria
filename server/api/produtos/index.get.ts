export default defineEventHandler(async (event) => {
  try {
    return await ProdutoSchema.find({})
  }
  catch (error) {
    return error
  }
})
