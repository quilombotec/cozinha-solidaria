export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await new ListadecompraSchema({ ...body, completado: false }).save();
  } catch (error) {
    return error;
  }
});
