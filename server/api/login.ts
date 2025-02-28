import bcrypt from "bcrypt";
import { z } from "zod";

const validacao = z.object({
  email: z.string().email(),
  senha: z.string(),
});

export default defineEventHandler(async (event) => {
  const resultado = await readValidatedBody(event, (body) =>
    validacao.safeParse(body)
  );

  if (!resultado.success) {
    return resultado.error;
  }

  const usuario = await UsuarioSchema.findOne({ email: resultado.data.email });

  if (!usuario) {
    throw createError({
      statusMessage: "E-mail não cadastrado",
    });
  }

  const matches = bcrypt.compareSync(resultado.data.senha, usuario.senha);

  if (!matches) {
    throw createError({
      statusMessage: "Senha incorreta",
    });
  }

  return usuario;
});
