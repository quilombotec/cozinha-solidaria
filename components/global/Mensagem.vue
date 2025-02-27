<template>
  <v-dialog v-model="dialog" width="400">
    <v-alert :type="mensagemStore.tipo">
      <p class="text-subtitle-1">
        {{ mensagemStore.mensagem }}
      </p>

      <v-row dense no-gutters justify="end">
        <v-btn
          @click="mensagemStore.mostrarMensagem = false"
          variant="outlined"
        >
          fechar
        </v-btn>
      </v-row>
    </v-alert>
  </v-dialog>
</template>

<script setup>
const mensagemStore = useMensagemStore();
const dialog = computed(() => mensagemStore.mostrarMensagem);
</script>
