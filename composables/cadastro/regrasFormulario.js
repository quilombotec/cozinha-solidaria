export const useRegrasFormularioCadastro = () => {
  const regrasEmail = [
    (value) => !!value || "Preenchimento obrigatório.",
    (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Email inválido.";
    },
  ];
  const regrasSenha = [(value) => !!value || "Preenchimento obrigatório."];
  const campoObrigatorio = [(value) => !!value || "Preenchimento obrigatório."];

  return { regrasEmail, regrasSenha, campoObrigatorio };
};
