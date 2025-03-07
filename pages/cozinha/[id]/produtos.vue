<template>
  <v-container>
    <v-row no-gutters justify="end" class="mb-6">
      <v-btn color="red" variant="flat" @click="mostrarModal = !mostrarModal">
        novo produto +
      </v-btn>
    </v-row>

    <v-data-table
      :headers="cabecalho"
      :items="produtos"
      class="tabela"
      :loading="status === 'pending' || carregando"
      no-data-text="Nenhum produto encontrado. Cadastre um novo produto."
      items-per-page="-1"
      hide-default-footer
    >
      <template v-slot:item.est="{ item }">
        <div>{{ item.est }} {{ unidades[item.un] }}</div>
      </template>

      <template v-slot:item.acoes="{ item }">
        <div class="d-flex ga-4 justify-end">
          <v-btn
            icon="mdi-pencil"
            color="blue"
            size="40"
            variant="outlined"
            @click="abrirModalEdicao(item)"
          ></v-btn>

          <v-btn
            icon="mdi-delete"
            color="red"
            size="40"
            variant="outlined"
            @click="validarExclusao(item._id)"
          ></v-btn>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="mostrarConfirmacaoDeletarProduto">
      <v-card color="red">
        <v-card-text>
          <p>Tem certeza que deseja excluir o item ?</p>
          <v-row no-gutters justify="space-between" class="mt-4">
            <v-btn
              variant="outlined"
              @click="mostrarConfirmacaoDeletarProduto = false"
              >cancelar</v-btn
            >
            <v-btn variant="flat" @click="deletarProduto(itemId)">sim</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <NovaCozinhaNovoProdutoModal
      v-model="mostrarModal"
      :adicionarProduto="adicionarProduto"
    />
    <NovaCozinhaEditarProdutoModal
      v-model="mostrarModalEdicao"
      :atualizarItem="atualizarItem"
    />
  </v-container>
</template>

<script setup>
const mensagemStore = useMensagemStore();
const usuarioStore = useUsuarioStore();
const route = useRoute();
const { data: produtos, status } = await useLazyFetch(
  `/api/produtos/cozinha/${route.params.id}`,
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

const mostrarModal = ref(false);
const cabecalho = [
  { title: "Nome", value: "nome", align: "start" },
  { title: "Estoque", value: "est", align: "center" },
  { title: "Ações", value: "acoes", align: "end" },
];
const unidades = {
  "Unitário(Un)": "Un",
  "Kilo(Kg)": "Kg",
  "Litro(L)": "L",
  "Pacote(P)": "P",
};

function adicionarProduto(produto) {
  produtos.value.push(produto);
}

const { abrirModalEdicao, atualizarItem, mostrarModalEdicao } =
  useAbrirModalEdicao(produtos);

const {
  deletarProduto,
  validarExclusao,
  mostrarConfirmacaoDeletarProduto,
  itemId,
  carregando,
} = useDeletarProduto(produtos);
</script>

<style scoped>
.tabela :deep(.v-data-table-header__content) {
  font-weight: bold !important;
}
</style>
