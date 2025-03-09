export default defineNuxtRouteMiddleware((to, from) => {
  const usuarioStore = useUsuarioStore();
  if (
    to.path === "/login" ||
    to.path === "/cadastro" ||
    to.path === "/cozinha-comunista"
  )
    return;

  if (usuarioStore.autenticado === false) {
    return navigateTo("/login");
  }
});
