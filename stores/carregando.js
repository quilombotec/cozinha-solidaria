import { defineStore } from "pinia";

export const useCarregandoStore = defineStore("carregando", () => {
  const carregando = ref(false);

  return { carregando };
});
