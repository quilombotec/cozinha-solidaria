export default defineEventHandler(async (event) => {
  try {
    const { ids } = await readBody(event);
    return await ListadecompraSchema.deleteMany({ _id: { $in: ids } });
  } catch (error) {
    return error;
  }
});
