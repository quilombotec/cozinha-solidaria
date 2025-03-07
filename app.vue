<template>
  <NuxtLayout>
    <NuxtPwaManifest />
    <NuxtPage />

    <v-snackbar v-movel="$pwa.needRefresh">
      <span> Atualização disponível, clique no atualizar. </span>

      <button @click="$pwa.updateServiceWorker()">Atualizar</button>
    </v-snackbar>
  </NuxtLayout>
</template>

<script setup>
const { $pwa } = useNuxtApp();
</script>
