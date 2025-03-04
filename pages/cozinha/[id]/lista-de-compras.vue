<template>
  <v-container>
    <h1>Lista de compras</h1>

    <v-card width="800" class="mx-auto">
      <v-card-text>
        <div
          v-show="todos.length"
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
              >Ativos
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
            v-show="todos.length > itensFaltantes"
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
            v-for="todo in listaDeCompras"
            :key="todo.id"
            density="compact"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center w-100">
                <v-checkbox
                  v-model="todo.completado"
                  hide-details
                  density="compact"
                  color="red"
                >
                </v-checkbox>
                <v-text-field
                  v-model="todo.titulo"
                  variant="text"
                  hide-details
                  density="compact"
                ></v-text-field>
              </div>

              <v-icon
                icon="mdi-delete"
                variant="falt"
                color="blue"
                @click="removerItem(todo)"
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
const STORAGE_KEY = "vue-todomvc";

const filtros = {
  todos: (todos) => todos,
  ativos: (todos) => todos.filter((todo) => !todo.completado),
  completado: (todos) => todos.filter((todo) => todo.completado),
};

// state
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
const visibilidade = ref("todos");

// derived state
const listaDeCompras = computed(() => filtros[visibilidade.value](todos.value));
const itensFaltantes = computed(() => filtros.ativos(todos.value).length);

// handle routing
window.addEventListener("hashchange", onHashChange);
onHashChange();

// persist state
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
});

const novoItem = ref("");
function adicionarItem() {
  const value = novoItem.value.trim();
  if (value) {
    todos.value.push({
      id: Date.now(),
      titulo: value,
      completado: false,
    });
    novoItem.value = "";
  }
}

function removerItem(todo) {
  todos.value.splice(todos.value.indexOf(todo), 1);
}

function removerCompletados() {
  todos.value = filtros.ativos(todos.value);
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
</script>
