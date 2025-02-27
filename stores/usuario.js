import { useSessionStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUsuarioStore = defineStore("usuario", () => {
  const autenticado = useSessionStorage("autenticado", false);
  const usuario = useSessionStorage("usuario", {});

  return { autenticado, usuario };
});
