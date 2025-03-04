<template>
  <v-container>
    <v-row no-gutters class="ga-6 mt-4">
      <v-card
        width="300"
        @click="router.push(`/cozinha/${route.params.id}/produtos`)"
      >
        <v-card-text>
          <v-row no-gutters justify="center">
            <v-icon size="50" color="red">mdi-view-list</v-icon>
          </v-row>
          <p class="text-h4 font-weight-bold text-center">Lista Produtos</p>
        </v-card-text>
      </v-card>

      <v-card
        width="300"
        @click="router.push(`/cozinha/${route.params.id}/lista-de-compras`)"
      >
        <v-card-text>
          <v-row no-gutters justify="center">
            <v-icon size="50" color="red">mdi-cart</v-icon>
          </v-row>
          <p class="text-h4 font-weight-bold text-center">Lista Compras</p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: ["admin"],
});

const router = useRouter();
const route = useRoute();
</script>
