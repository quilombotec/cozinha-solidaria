import jwt from "jsonwebtoken";

const rotasSemAutenticacao = {
  "/api/login": true,
  "/api/usuarios/create": true,
};

export default defineEventHandler((event) => {
  if (!rotasSemAutenticacao[event.path] && event.path.includes("api")) {
    const token = getHeader(event, "Authorization")?.split(" ")[1];

    if (!token) {
      throw createError({ statusCode: 401, message: "Não autorizado" });
    }

    try {
      const decodificado = jwt.verify(token, process.env.JWT_SECRET);
      event.context.auth = decodificado;
    } catch (error) {
      throw createError({ statusCode: 403, message: "Token inválido" });
    }
  }
});
