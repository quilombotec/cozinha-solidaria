import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const hashed = bcrypt.hashSync(body.senha, 10);

  try {
    return await new UsuarioSchema({
      senha: hashed,
      ...body,
    }).save();
  } catch (error) {
    return error;
  }
});
