import { z } from "zod";

const validacao = z.object({
  usuarioId: z.string(),
  cozinhaId: z.string(),
});

export default defineEventHandler(async (event) => {
  const resultado = await readValidatedBody(event, (body) =>
    validacao.safeParse(body)
  );

  if (!resultado.success) {
    return resultado.error;
  }

  try {
    const usuarioAtualizado = await UsuarioSchema.findByIdAndUpdate(
      resultado.data.usuarioId,
      {
        $push: { cozinhas: resultado.data.cozinhaId },
      }
    );

    if (!usuarioAtualizado) {
      return createError({
        statusCode: 404,
        message: "Usuário não encontrado",
      });
    }
    return;
  } catch (error) {
    return error;
  }
});
