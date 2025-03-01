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

  function loginValidacao() {
    if (validado.value) {
      login();
    }
  }

  const login = async () => {
    carregando.value = true;

    $fetch(`/api/login`, {
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
        router.push("/inicio");
      })
      .catch((err) => {
        mensagemStore.tipo = "error";
        mensagemStore.mensagem = err.response._data.message;
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
