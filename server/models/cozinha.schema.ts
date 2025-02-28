import { defineMongooseModel } from '#nuxt/mongoose'

export const CozinhaSchema = defineMongooseModel({
  name: 'Cozinha',
  schema: {
  nome: {
    type: 'string',
    required: true
  },
  estado: {
    type: 'string',
    required: true
  },
  cidade: {
    type: 'string',
    required: true
  },
  bairro: {
    type: 'string',
    required: true
  },
  rua: {
    type: 'string',
    required: true
  },
  numero: {
    type: 'string',
    required: true
  }
},
})
