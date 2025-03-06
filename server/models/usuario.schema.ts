import { defineMongooseModel } from "#nuxt/mongoose";

export const UsuarioSchema = defineMongooseModel({
  name: "Usuario",
  schema: {
    nome: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    telefone: {
      type: "string",
      required: true,
    },
    senha: {
      type: "string",
      required: true,
    },
    adm: {
      type: Boolean,
      required: true,
    },
    cozinhas: {
      type: Array,
    },
  },
});
