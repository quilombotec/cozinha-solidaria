export default defineEventHandler(async (event) => {
  try {
    return await CozinhaSchema.find({});
  } catch (error) {
    return error;
  }
});
