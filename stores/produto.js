import { defineStore } from "pinia";

export const useProdutoStore = defineStore("produto", () => {
  const produto = ref({});

  return { produto };
});
