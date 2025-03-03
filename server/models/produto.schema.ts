import { defineMongooseModel } from "#nuxt/mongoose";

export const ProdutoSchema = defineMongooseModel({
  name: "Produto",
  schema: {
    nome: {
      type: "string",
      required: true,
    },
    // cat: {
    //   type: "string",
    //   required: true,
    // },
    un: {
      type: "string",
      required: true,
    },
    est: {
      type: "string",
      required: true,
    },
    estMin: {
      type: "string",
      required: true,
    },
    cozId: {
      type: "string",
      required: true,
    },
  },
});
