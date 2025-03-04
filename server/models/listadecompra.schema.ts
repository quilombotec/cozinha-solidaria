import { defineMongooseModel } from "#nuxt/mongoose";

export const ListadecompraSchema = defineMongooseModel({
  name: "Listadecompra",
  schema: {
    nome: {
      type: "string",
      required: true,
    },
    completado: {
      type: Boolean,
    },
    cozId: {
      type: "string",
      required: true,
    },
  },
});
