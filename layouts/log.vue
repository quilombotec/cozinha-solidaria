<template>
  <v-app>
    <v-app-bar class="bg-grey-lighten-3" elevation="0">
      <v-row no-gutters justify="center">
        <v-icon size="60">mdi-silverware-fork-knife</v-icon>
        <p class="text-h2 font-weight-bold text-red ml-2">Cozinha Comunista</p>
      </v-row>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <slot />
    </v-main>

    <Mensagem />
    <Carregando />
  </v-app>
</template>

<script setup></script>
