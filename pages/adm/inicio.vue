<template>
  <v-container>
    <v-row class="mt-4">
      <v-col v-for="(cozinha, idx) in cozinhas" :key="idx" cols="12" md="4">
        <v-card elevation="0">
          <v-card-text>
            <div class="d-flex">
              <div class="ml-3">
                <p class="text-subtitle-1">{{ cozinha.nome }}</p>
                <p class="text-subtitle-1 text-grey">{{ cozinha.estado }}</p>
                <p class="text-subtitle-1 text-grey">{{ cozinha.cidade }}</p>
                <p class="text-subtitle-1 text-grey">{{ cozinha.rua }}</p>
                <p class="text-subtitle-1 text-grey">{{ cozinha.numero }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "adm",
  middleware: ["admin"],
});

const mensagemStore = useMensagemStore();

const { data: cozinhas, status } = await useLazyFetch(`/api/cozinhas`, {
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
