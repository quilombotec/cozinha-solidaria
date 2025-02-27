export default defineEventHandler(async (event) => {
  try {
    return await UsuarioSchema.find({})
  }
  catch (error) {
    return error
  }
})
