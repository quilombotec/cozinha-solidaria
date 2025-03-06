export default defineEventHandler(async (event) => {
  try {
    const { ids } = getQuery(event);
    if (!Object.keys(ids).length) {
      return createError({
        statusCode: 404,
        message: "Usuário não tem cozinha cadastrada",
      });
    }

    const objectIds = ids.split(",");
    return await CozinhaSchema.find({ _id: { $in: objectIds } });
  } catch (error) {
    return error;
  }
});
