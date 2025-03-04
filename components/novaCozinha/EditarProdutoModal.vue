<template>
  <v-dialog v-model="model" max-width="400">
    <v-card :loading="carregando">
      <v-card-title class="d-flex justify-space-between align-center">
        <p class="text-h5 text-medium-emphasis ps-2">Editar produto</p>

        <v-btn icon="mdi-close" variant="text" @click="model = false"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent v-model="validado">
          <v-text-field
            v-model="produtoStore.produto.nome"
            placeholder="Nome do item"
            :rules="regras"
          ></v-text-field>
          <!-- <v-select :items="categorias" placeholder="Categoria"></v-select> -->
          <v-select
            v-model="produtoStore.produto.un"
            :items="unidades"
            placeholder="Unidade de medida"
            :rules="regras"
          ></v-select>
          <v-text-field
            v-model="produtoStore.produto.est"
            placeholder="Estoque"
            :rules="regras"
          ></v-text-field>
          <v-text-field
            v-model="produtoStore.produto.estMin"
            placeholder="Estoque mínimo"
            :rules="regras"
          ></v-text-field>

          <div no-gutters class="d-flex justify-space-between mt-4">
            <v-btn variant="outlined" @click="model = false">Cancelar</v-btn>

            <v-btn
              color="red"
              variant="flat"
              @click="validarEdição()"
              :loading="carregando"
              :disabled="carregando"
              type="submit"
            >
              Salvar
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({ atualizarItem: { type: Function } });
const mensagemStore = useMensagemStore();
const usuarioStore = useUsuarioStore();
const produtoStore = useProdutoStore();

const model = defineModel();
// const categorias = [];
const unidades = ["Unitário(Un)", "Kilo(Kg)", "Litro(L)", "Pacote(P)"];
const carregando = ref(false);
const regras = [(value) => !!value || "Preenchimento obrigatório."];

const validado = ref(false);
function validarEdição() {
  if (validado.value) {
    salvar();
  }
}

function salvar() {
  carregando.value = true;
  $fetch(`/api/produtos/${produtoStore.produto._id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioStore.usuario.token}`,
    },
    method: "put",
    body: {
      nome: produtoStore.produto.nome,
      un: produtoStore.produto.un,
      est: produtoStore.produto.est,
      estMin: produtoStore.produto.estMin,
    },
  })
    .then((res) => {
      props.atualizarItem();
      mensagemStore.tipo = "success";
      mensagemStore.mensagem = "Produto editado com sucesso";
      mensagemStore.mostrarMensagem = true;
    })
    .catch((err) => {
      mensagemStore.tipo = "error";
      mensagemStore.mensagem = err.response._data.message;
      mensagemStore.mostrarMensagem = true;
    })
    .finally(() => (carregando.value = false));
}
</script>
