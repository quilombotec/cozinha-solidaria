import { ref } from "vue";

export function useLogin() {
  const carregando = ref(false);
  const email = ref("");
  const senha = ref("");
  const router = useRouter();
  const mensagemStore = useMensagemStore();
  const usuarioStore = useUsuarioStore();
  let mostrarSenha = ref(false);
  let validado = ref(false);
  const runtimeConfig = useRuntimeConfig();

  function loginValidacao() {
    if (validado.value) {
      login();
    }
  }

  const login = async () => {
    carregando.value = true;

    $fetch(`${runtimeConfig.public.baseApi}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email.value,
        senha: senha.value,
      },
    })
      .then((res) => {
        usuarioStore.autenticado = true;
        usuarioStore.usuario = res;
        usuarioStore.empresaSelecionada = res.lojas[0];
        irPara(res, mensagemStore, router);
      })
      .catch((err) => {
        mensagemStore.tipo = "error";
        mensagemStore.mensagem = {
          mensagem: err.response._data.message,
          erros: err.response._data.errors?.json,
        };
        mensagemStore.mostrarMensagem = true;
      })
      .finally(() => (carregando.value = false));
  };

  return {
    email,
    senha,
    carregando,
    mostrarSenha,
    validado,
    loginValidacao,
  };
}

function irPara(usuario, mensagemStore, router) {
  if (usuario.adminLBC) {
    router.push("/lojas");
  } else {
    if (usuario.lojas.length > 0) {
      router.push(`/loja/inicio/${usuario.lojas[0].lojaId}`);
    } else {
      mensagemStore.tipo = "error";
      mensagemStore.mensagem =
        "Usuário não possui uma loja cadastrada. Entre em contado com a LBC para cadastrar sua loja.";
      mensagemStore.mostrarMensagem = true;
    }
  }
}
