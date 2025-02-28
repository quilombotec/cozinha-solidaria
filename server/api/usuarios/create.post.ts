import bcrypt from "bcrypt";
import { z } from "zod";

const validacao = z.object({
  nome: z.string(),
  email: z.string().email(),
  telefone: z.string().min(9).max(11),
  senha: z.string(),
});

export default defineEventHandler(async (event) => {
  const resultado = await readValidatedBody(event, (body) =>
    validacao.safeParse(body)
  );

  if (!resultado.success) {
    return resultado.error;
  }

  const hashed = bcrypt.hashSync(resultado.data.senha, 10);

  try {
    return await new UsuarioSchema({
      ...resultado.data,
      adm: false,
      cozinhas: [],
      senha: hashed,
    }).save();
  } catch (error) {
    return error;
  }
});
