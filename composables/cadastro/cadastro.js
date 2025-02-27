export const useCadastro = () => {
  const nome = ref("");
  const senha = ref("");
  const email = ref("");
  const telefone = ref("");
  const validado = ref(false);
  const mostrarSenha = ref(false);
  const carregandoStore = useCarregandoStore();
  const runtimeConfig = useRuntimeConfig();
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
      $fetch(`${runtimeConfig.public.baseApi}/usuario`, {
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
        .then(() => {
          mensagemStore.tipo = "success";
          mensagemStore.mensagem = "Usuário cadastrado com sucesso";
          mensagemStore.mostrarMensagem = true;
          router.push("/login");
        })
        .catch((err) => {
          mensagemStore.tipo = "error";
          mensagemStore.mensagem = {
            mensagem: err.response._data.status,
            erros: err.response._data.errors?.json,
          };
          mensagemStore.mostrarMensagem = true;
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
