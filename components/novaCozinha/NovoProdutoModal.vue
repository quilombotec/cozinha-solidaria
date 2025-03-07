<template>
  <v-dialog v-model="model" max-width="400">
    <v-card :loading="carregando">
      <v-card-title class="d-flex justify-space-between align-center">
        <p class="text-h5 text-medium-emphasis ps-2">Novo produto</p>

        <v-btn icon="mdi-close" variant="text" @click="model = false"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent v-model="validado">
          <v-text-field
            v-model="nome"
            placeholder="Nome do item"
            :rules="regras"
          ></v-text-field>
          <!-- <v-select :items="categorias" placeholder="Categoria"></v-select> -->
          <v-select
            v-model="unidade"
            :items="unidades"
            placeholder="Unidade de medida"
            :rules="regras"
          ></v-select>
          <v-text-field
            v-model="estoque"
            placeholder="Estoque"
            :rules="regras"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="estoqueMinimo"
            placeholder="Estoque mínimo"
            :rules="regras"
            type="number"
          ></v-text-field>

          <div no-gutters class="d-flex justify-space-between mt-4">
            <v-btn variant="outlined" @click="fechar">Cancelar</v-btn>

            <v-btn
              color="red"
              variant="flat"
              @click="validarCadastro"
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
const props = defineProps({ adicionarProduto: { type: Function } });
const mensagemStore = useMensagemStore();
const usuarioStore = useUsuarioStore();
const route = useRoute();

const model = defineModel();
// const categorias = [];
const nome = ref("");
const unidades = ["Unitário(Un)", "Kilo(Kg)", "Litro(L)", "Pacote(P)"];
const unidade = ref(null);
const estoque = ref(null);
const estoqueMinimo = ref(null);
const carregando = ref(false);
const regras = [(value) => !!value || "Preenchimento obrigatório."];

function fechar() {
  limparFormulario();
  model.value = false;
}

function limparFormulario() {
  nome.value = "";
  unidade.value = null;
  estoque.value = null;
  estoqueMinimo.value = null;
}

const validado = ref(false);
function validarCadastro() {
  if (validado.value) {
    cadastrar();
  }
}

function cadastrar() {
  carregando.value = true;
  $fetch(`/api/produtos/create`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usuarioStore.usuario.token}`,
    },
    method: "post",
    body: {
      nome: nome.value,
      un: unidade.value,
      est: estoque.value,
      estMin: estoqueMinimo.value,
      cozId: route.params.id,
    },
  })
    .then((res) => {
      limparFormulario();
      props.adicionarProduto(res);
      mensagemStore.tipo = "success";
      mensagemStore.mensagem = "Produto cadastrado com sucesso";
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
