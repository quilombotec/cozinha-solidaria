<template>
  <v-container>
    <v-progress-linear
      v-if="status === 'pending'"
      indeterminate
      color="blue"
    ></v-progress-linear>

    <v-row class="mt-4">
      <v-col v-for="(cozinha, idx) in cozinhas" :key="idx" cols="12" md="4">
        <v-card elevation="0" @click="router.push(`/cozinha/${cozinha._id}`)">
          <v-card-text>
            <div class="d-flex">
              <div class="ml-3">
                <p class="text-h6 font-weight-bold">
                  {{ cozinha.nome }}
                </p>
                <p class="text-subtitle-1 text-grey">
                  Estado: {{ cozinha.estado }}
                </p>
                <p class="text-subtitle-1 text-grey">
                  Cidade: {{ cozinha.cidade }}
                </p>
                <p class="text-subtitle-1 text-grey">
                  Rua: {{ cozinha.rua }} {{ cozinha.numero }}
                </p>
                <p class="text-subtitle-1 text-grey"></p>
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
  layout: "default",
  middleware: ["admin"],
});

const mensagemStore = useMensagemStore();
const usuarioStore = useUsuarioStore();
const router = useRouter();

const { data: cozinhas, status } = await useLazyFetch(`/api/cozinhas`, {
  default: () => [],
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${usuarioStore.usuario.token}`,
  },
  onResponseError({ response }) {
    mensagemStore.tipo = "error";
    mensagemStore.mensagem = response._data.message;
    mensagemStore.mostrarMensagem = true;
  },
});
</script>

<style></style>
