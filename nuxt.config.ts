// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  spaLoadingTemplate: true,
  features: {
    inlineStyles: false,
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "nuxt-quasar-ui"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/quasar-variables.scss" as *;',
        },
      },
    },
  },
  i18n: {
    lazy: true,
    differentDomains: true,
    langDir: "locales",
    strategy: "no_prefix",
    defaultLocale: "en",
    locales: [
      {
        code: "ru",
        iso: "ru-RU",
        file: "ru.json",
        domain: process.env.RU_DOMAIN,
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        domain: process.env.EN_DOMAIN,
      },
    ],
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: false,
    //  {
    //   useCookie: true,
    //   cookieKey: "i18n_redirected",
    //   redirectOn: "root", // recommended
    // },
  },
  quasar: {
    plugins: ["Dialog", "Screen"],
    sassVariables: true,
    iconSet: "mdi-v7",
    extras: {
      font: "roboto-font",
    },
  },
  compatibilityDate: "2024-07-05",
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap",
        },
      ],
    },
  },
});
