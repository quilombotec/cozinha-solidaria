import { defineStore } from "pinia";

export const useMensagemStore = defineStore("mensagem", () => {
  const mostrarMensagem = ref(false);
  const mensagem = ref("");
  const tipo = ref("");

  return { mostrarMensagem, mensagem, tipo };
});
