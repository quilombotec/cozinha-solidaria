<template>
  <v-dialog v-model="dialog" persistent>
    <div class="d-flex flex-column ga-2 align-center justify-center">
      <v-progress-circular indeterminate color="blue"></v-progress-circular>
      <p class="text-white">Carregando</p>
    </div>
  </v-dialog>
</template>

<script setup>
const props = defineProps({ carregando: { type: Boolean } });
const carregandoStore = useCarregandoStore();
const dialog = computed(() => {
  return carregandoStore.carregando || props.carregando;
});
</script>
