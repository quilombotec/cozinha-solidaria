<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="(item, idx) in items"
          :key="idx"
          :prepend-icon="`mdi-${item.icone}`"
          :title="item.titulo"
          @click="router.push(item.rota)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="bg-grey-lighten-3" elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-row no-gutters justify="center">
        <v-icon size="60">mdi-silverware-fork-knife</v-icon>
        <p class="text-h2 font-weight-bold text-red ml-2">Cozinha solidária</p>
      </v-row>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <slot />
    </v-main>

    <Mensagem />
    <Carregando />
  </v-app>
</template>

<script setup>
const router = useRouter();
const drawer = ref(null);
const items = [
  {
    titulo: "Inicio",
    icone: "home",
    rota: "/adm/inicio",
  },
  {
    titulo: "Usuários",
    icone: "account-group",
    rota: "/adm/usuarios",
  },
  {
    titulo: "Nova cozinha",
    icone: "silverware-fork-knife",
    rota: "/adm/nova-cozinha",
  },
];
</script>
