<template>
  <v-container>
    <v-data-table
      :items="usuarios"
      :loading="status === 'pending'"
    ></v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: ["admin"],
});

const mensagemStore = useMensagemStore();

const { data: usuarios, status } = await useLazyFetch(`/api/usuarios`, {
  default: () => [],
  headers: {
    "Content-Type": "application/json",
    // Authorization: usuarioStore.usuario.token,
  },
  onResponseError({ response }) {
    mensagemStore.tipo = "error";
    mensagemStore.mensagem = response._data.mensagem;
    mensagemStore.mostrarMensagem = true;
  },
});
</script>

<style></style>
