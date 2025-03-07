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
    "@vite-pwa/nuxt",
  ],
  pwa: {
    /* PWA options */
    manifest: {
      name: "Cozinha comunista",
      short_name: "CozinhaComunista",
      icons: [
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  },
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
