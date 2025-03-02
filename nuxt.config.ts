// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  imports: {
    dirs: ["composables/**"],
  },
  ssr: false,
  modules: [
    "vuetify-nuxt-module",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-mongoose",
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
});
