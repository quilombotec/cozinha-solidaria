export const useRegrasFormularioNovaCozinha = () => {
  const regras = [(value) => !!value || "Preenchimento obrigatório."];

  return { regras };
};
