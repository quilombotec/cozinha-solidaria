import { defineMongooseModel } from "#nuxt/mongoose";

export const ProdutoSchema = defineMongooseModel({
  name: "Produto",
  schema: {
    nome: {
      type: "string",
      required: true,
    },
    cat: {
      type: "string",
      required: true,
    },
    un: {
      type: "string",
      required: true,
    },
    qt: {
      type: "string",
      required: true,
    },
    qtMin: {
      type: "string",
      required: true,
    },
    cozinhaId: {
      type: "string",
      required: true,
    },
  },
});
