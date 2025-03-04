<template>
  <v-container>
    <h1 class="mb-4">Lista de compras</h1>

    <v-card width="800" class="mx-auto" :loading="status === 'pending'">
      <v-card-text>
        <div
          v-if="itens.length"
          class="d-flex justify-space-between align-center"
          no-gutters
        >
          <div>
            {{ itensFaltantes === 1 ? " falta" : " Faltam" }}
            <strong>{{ itensFaltantes }}</strong>
            {{ itensFaltantes === 1 ? " item" : " items" }}
          </div>

          <div class="d-flex">
            <v-btn
              color="blue"
              href="#/todos"
              :variant="visibilidade === 'todos' ? 'flat' : 'text'"
            >
              Todos
            </v-btn>

            <v-btn
              color="blue"
              href="#/ativos"
              :variant="visibilidade === 'ativos' ? 'flat' : 'text'"
            >
              Ativos
            </v-btn>

            <v-btn
              color="blue"
              href="#/completado"
              :variant="visibilidade === 'completado' ? 'flat' : 'text'"
            >
              Completos
            </v-btn>
          </div>

          <v-btn
            @click="removerCompletados"
            v-if="itens.length > itensFaltantes"
            color="pink"
          >
            Remover completos
          </v-btn>
        </div>

        <v-text-field
          v-model="novoItem"
          placeholder="Adicionar item"
          @keyup.enter="adicionarItem"
          class="my-4"
          variant="outlined"
          hide-details
        ></v-text-field>

        <v-list density="compact">
          <v-list-item
            v-for="item in listaDeCompras"
            :key="item.id"
            density="compact"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center w-100">
                <v-checkbox
                  v-model="item.completado"
                  hide-details
                  density="compact"
                  color="red"
                  @change="atualizarItem(item)"
                >
                </v-checkbox>
                <v-text-field
                  v-model="item.nome"
                  variant="text"
                  hide-details
                  density="compact"
                  @keyup="iniciarContador(item)"
                  @keydown="limparTemporizador"
                ></v-text-field>
              </div>

              <v-icon
                icon="mdi-delete"
                variant="falt"
                color="blue"
                @click="removerItem(item)"
              ></v-icon>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: ["admin"],
});
const mensagemStore = useMensagemStore();
const usuarioStore = useUsuarioStore();
const route = useRoute();

// state
const { data: itens, status } = await useLazyFetch(
  `/api/listadecompras/cozinha/${route.params.id}`,
  {
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
  }
);
const visibilidade = ref("todos");

const filtros = {
  todos: () => itens.value,
  ativos: () => itens.value.filter((item) => !item.completado),
  completado: () => itens.value.filter((item) => item.completado),
};

// derived state
const listaDeCompras = computed(() => filtros[visibilidade.value]());
const itensFaltantes = computed(() => filtros.ativos().length);

// handle routing
window.addEventListener("hashchange", onHashChange);
onHashChange();

const novoItem = ref("");
const carregando = ref(false);
function adicionarItem() {
  const value = novoItem.value.trim();
  if (value) {
    carregando.value = true;
    $fetch(`/api/listadecompras/create`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuarioStore.usuario.token}`,
      },
      method: "post",
      body: {
        nome: novoItem.value,
        cozId: route.params.id,
      },
    })
      .then((res) => {
        itens.value.push(res);
        novoItem.value = "";
      })
      .catch((err) => {
        mensagemStore.tipo = "error";
        mensagemStore.mensagem = err.response._data.message;
        mensagemStore.mostrarMensagem = true;
      })
      .finally(() => (carregando.value = false));
  }
}

function atualizarItem(item) {
  carregando.value = true;
  $fetch(`/api/listadecompras/${item._id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioStore.usuario.token}`,
    },
    method: "put",
    body: {
      nome: item.nome,
      completado: item.completado,
    },
  })
    .then((res) => {})
    .catch((err) => {
      mensagemStore.tipo = "error";
      mensagemStore.mensagem = err.response._data.message;
      mensagemStore.mostrarMensagem = true;
    })
    .finally(() => (carregando.value = false));
}

function removerItem(item) {
  carregando.value = true;
  $fetch(`/api/listadecompras/${item._id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioStore.usuario.token}`,
    },
    method: "delete",
  })
    .then((res) => {
      itens.value.splice(itens.value.indexOf(item), 1);
    })
    .catch((err) => {
      mensagemStore.tipo = "error";
      mensagemStore.mensagem = err.response._data.message;
      mensagemStore.mostrarMensagem = true;
    })
    .finally(() => (carregando.value = false));
}

function removerCompletados(item) {
  carregando.value = true;
  $fetch(`/api/listadecompras/deletarCompletados`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioStore.usuario.token}`,
    },
    method: "delete",
    body: {
      ids: filtros.completado(),
    },
  })
    .then((res) => {
      itens.value = filtros.ativos(itens.value);
    })
    .catch((err) => {
      mensagemStore.tipo = "error";
      mensagemStore.mensagem = err.response._data.message;
      mensagemStore.mostrarMensagem = true;
    })
    .finally(() => (carregando.value = false));
}

function onHashChange() {
  const route = window.location.hash.replace(/#\/?/, "");
  if (filtros[route]) {
    visibilidade.value = route;
  } else {
    window.location.hash = "";
    visibilidade.value = "todos";
  }
}

const temporizadorTeclado = ref(null);
function iniciarContador(item) {
  clearTimeout(temporizadorTeclado.value);
  temporizadorTeclado.value = setTimeout(() => atualizarItem(item), 700);
}

function limparTemporizador() {
  clearTimeout(temporizadorTeclado.value);
}
</script>
