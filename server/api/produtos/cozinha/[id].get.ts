export default defineEventHandler(async (event) => {
  try {
    return await ProdutoSchema.find({ cozId: event.context.params?.id });
  } catch (error) {
    return error;
  }
});
