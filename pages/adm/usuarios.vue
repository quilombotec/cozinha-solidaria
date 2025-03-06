<template>
  <v-container>
    <v-row no-gutters justify="space-between">
      <h2>Lista usuários</h2>
      <v-btn color="blue" variant="flat" @click="adicionarCozinha"
        >adicionar cozinha</v-btn
      >
    </v-row>
    <v-data-table
      v-model="usuarioSelecionado"
      :headers="cabecalhoUsuarios"
      :items="usuarios"
      :loading="status === 'pending'"
      items-per-page="-1"
      hide-default-footer
      class="tabela mt-2"
      show-select
      select-strategy="single"
      return-object
    ></v-data-table>

    <v-row no-gutters justify="space-between" class="mt-6 mb-2">
      <h2>Lista cozinhas</h2>
      <v-btn color="blue" variant="flat" @click="adicionarCozinha"
        >adicionar cozinha</v-btn
      >
    </v-row>
    <v-data-table
      v-model="cozinhaSelecionada"
      :headers="cabecalhoCozinhas"
      :items="cozinhas"
      :loading="statusCozinha === 'pending'"
      items-per-page="-1"
      hide-default-footer
      class="tabela"
      show-select
      select-strategy="single"
      return-object
    ></v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: ["admin"],
});

const mensagemStore = useMensagemStore();
const usuarioStore = useUsuarioStore();

const cabecalhoUsuarios = [
  { title: "Nome", value: "nome" },
  { title: "E-mail", value: "email" },
  { title: "Telefone", value: "telefone" },
  { title: "id", value: "_id" },
];
const cabecalhoCozinhas = [
  { title: "Nome", value: "nome" },
  { title: "Estado", value: "estado" },
  { title: "Cidade", value: "cidade" },
  { title: "Bairro", value: "bairro" },
  { title: "Número", value: "numero" },
  { title: "Rua", value: "rua" },
  { title: "id", value: "_id" },
];
const { data: usuarios, status } = await useLazyFetch(`/api/usuarios`, {
  default: () => [],
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${usuarioStore.usuario.token}`,
  },
  onResponseError({ response }) {
    mensagemStore.tipo = "error";
    mensagemStore.mensagem = response._data.mensagem;
    mensagemStore.mostrarMensagem = true;
  },
});

const { data: cozinhas, status: statusCozinha } = await useLazyFetch(
  `/api/cozinhas/todas`,
  {
    default: () => [],
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioStore.usuario.token}`,
    },
    onResponseError({ response }) {
      mensagemStore.tipo = "error";
      mensagemStore.mensagem = response._data.mensagem;
      mensagemStore.mostrarMensagem = true;
    },
  }
);

const usuarioSelecionado = ref();
const cozinhaSelecionada = ref();
const carregandoStore = useCarregandoStore();
function adicionarCozinha() {
  carregandoStore.carregando = true;
  $fetch(`/api/usuarios/adicionar-cozinha`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioStore.usuario.token}`,
    },
    method: "post",
    body: {
      usuarioId: usuarioSelecionado.value[0]._id,
      cozinhaId: cozinhaSelecionada.value[0]._id,
    },
  })
    .then((res) => {
      mensagemStore.tipo = "success";
      mensagemStore.mensagem = "Cozinha integrada com sucesso";
      mensagemStore.mostrarMensagem = true;
    })
    .catch((err) => {
      mensagemStore.tipo = "error";
      mensagemStore.mensagem = err.response._data.message;
      mensagemStore.mostrarMensagem = true;
    })
    .finally(() => (carregandoStore.carregando = false));
}
</script>

<style scoped>
.tabela :deep(.v-data-table-header__content) {
  font-weight: bold !important;
}
</style>
