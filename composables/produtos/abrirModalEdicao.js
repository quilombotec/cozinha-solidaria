export function useAbrirModalEdicao(produtos) {
  const produtoStore = useProdutoStore();
  const mostrarModalEdicao = ref(false);

  function abrirModalEdicao(item) {
    produtoStore.produto = JSON.parse(JSON.stringify(item));
    mostrarModalEdicao.value = true;
  }

  function atualizarItem() {
    produtos.value = produtos.value.map((prod) => {
      if (prod._id === produtoStore.produto._id) {
        return produtoStore.produto;
      } else {
        return prod;
      }
    });
  }
  return { abrirModalEdicao, atualizarItem, mostrarModalEdicao };
}
