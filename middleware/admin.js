export default defineNuxtRouteMiddleware((to, from) => {
  const usuarioStore = useUsuarioStore();
  if (usuarioStore.usuario.adm) {
    return;
  } else {
    return abortNavigation();
  }
});
