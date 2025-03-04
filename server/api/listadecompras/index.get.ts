export default defineEventHandler(async (event) => {
  try {
    return await ListadecompraSchema.find({ cozId: event.context.params?.id });
  } catch (error) {
    return error;
  }
});
