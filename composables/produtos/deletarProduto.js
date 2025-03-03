export function useDeletarProduto(produtos) {
  const mensagemStore = useMensagemStore();
  const usuarioStore = useUsuarioStore();
  const carregando = ref(false);

  function deletarProduto(id) {
    carregando.value = true;
    $fetch(`/api/produtos/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuarioStore.usuario.token}`,
      },
      method: "delete",
    })
      .then((res) => {
        produtos.value = produtos.value.filter((prod) => prod._id !== id);
        mensagemStore.tipo = "success";
        mensagemStore.mensagem = "Produto excluído com sucesso";
        mensagemStore.mostrarMensagem = true;
      })
      .catch((err) => {
        mensagemStore.tipo = "error";
        mensagemStore.mensagem = err.response._data.message;
        mensagemStore.mostrarMensagem = true;
      })
      .finally(() => (carregando.value = false));
  }
  return { deletarProduto, carregando };
}
