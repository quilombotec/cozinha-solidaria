export const useNovaCozinha = () => {
  const carregandoStore = useCarregandoStore();
  const mensagemStore = useMensagemStore();
  const usuarioStore = useUsuarioStore();
  const validado = ref(false);
  const nome = ref("");
  const estado = ref("");
  const cidade = ref("");
  const bairro = ref("");
  const rua = ref("");
  const numero = ref("");
  const estados = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  function validarCadastro() {
    if (validado.value) {
      cadastrar();
    }
  }

  function cadastrar() {
    carregandoStore.carregando = true;
    $fetch(`/api/cozinhas/create`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuarioStore.usuario.token}`,
      },
      method: "post",
      body: {
        nome: nome.value,
        estado: estado.value,
        cidade: cidade.value,
        bairro: bairro.value,
        rua: rua.value,
        numero: numero.value,
      },
    })
      .then(() => {
        mensagemStore.tipo = "success";
        mensagemStore.mensagem = "Cozinha criada com sucesso";
        mensagemStore.mostrarMensagem = true;
      })
      .catch((err) => {
        mensagemStore.tipo = "error";
        mensagemStore.mensagem = err.response._data.message;
        mensagemStore.mostrarMensagem = true;
      })
      .finally(() => (carregandoStore.carregando = false));
  }

  return {
    estados,
    validado,
    nome,
    estado,
    cidade,
    bairro,
    rua,
    numero,
    validarCadastro,
  };
};
