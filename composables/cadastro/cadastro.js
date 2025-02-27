export const useCadastro = () => {
  const nome = ref("");
  const senha = ref("");
  const email = ref("");
  const telefone = ref("");
  const validado = ref(false);
  const mostrarSenha = ref(false);
  const carregandoStore = useCarregandoStore();
  const mensagemStore = useMensagemStore();
  const router = useRouter();

  function validarCadastro() {
    if (validado.value) {
      cadastrar();
    }
  }

  function cadastrar() {
    if (validado.value) {
      carregandoStore.carregando = true;
      $fetch(`/api/usuarios/create`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: {
          nome: nome.value,
          telefone: telefone.value,
          senha: senha.value,
          email: email.value,
        },
      })
        .then((res) => {
          mensagemStore.tipo = "success";
          mensagemStore.mensagem = "Usuário cadastrado com sucesso";
          mensagemStore.mostrarMensagem = true;
          router.push("/login");
        })
        .catch((err) => {
          mensagemStore.tipo = "error";
          (mensagemStore.mensagem = err.response._data.message),
            (mensagemStore.mostrarMensagem = true);
        })
        .finally(() => (carregandoStore.carregando = false));
    }
  }

  return {
    nome,
    senha,
    email,
    telefone,
    mostrarSenha,
    validado,
    validarCadastro,
  };
};
