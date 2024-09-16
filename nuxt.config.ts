// https://nuxt.com/docs/api/configuration/nuxt-config

import { quasar } from '@quasar/vite-plugin';

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  spaLoadingTemplate: true,
  features: {
    inlineStyles: false,
  },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', 'nuxt-quasar-ui'],
  vite: {
    plugins: [quasar()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/quasar-variables.scss" as *;',
        },
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      include: ['quasar'],
    },
  },
  runtimeConfig: {
    public: {
      apiUrlEn: process.env.NUXT_PUBLIC_API_URL_EN,
      apiUrlRu: process.env.NUXT_PUBLIC_API_URL_RU,
    },
  },
  i18n: {
    lazy: true,
    differentDomains: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru.json',
        domain: process.env.NUXT_RU_DOMAIN,
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        domain: process.env.NUXT_EN_DOMAIN,
      },
    ],
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: false,
  },
  quasar: {
    plugins: ['Dialog', 'Screen'],
    sassVariables: true,
    iconSet: 'mdi-v7',
    extras: {
      font: 'roboto-font',
    },
  },
  compatibilityDate: '2024-07-05',
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap',
        },
      ],
    },
  },
});
