import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
  vite: {
    server: {
      hmr: {
        host: 'localhost',
        port: 3000
      }
    },
    plugins: [
      svgLoader(),
    ],
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", '@nuxtjs/tailwindcss', "@nuxt/image"],

  app: {
    head: {
      meta: [
        {name: "robots", content: "noindex"}
      ],
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    },
  },
  i18n: {
    routesNameSeparator: "__",
    vueI18n: "i18n.config.ts",
    baseUrl: "https://base.url",
    defaultLocale: "ru",
    strategy: "prefix_and_default",
    lazy: false,
    compilation: {
      escapeHtml: false,
      strictMessage: false,
    },
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: "",
      redirectOn: "root",
      useCookie: true,
      cookieCrossOrigin: false,
      cookieDomain: null,
      cookieKey: "i18n_redirected",
      cookieSecure: false,
    },
    // Locales
    langDir: "locales",
    locales: [
      {code: "ru", name: 'Русский', language: "ru-RU", file: "ru.json"},
      {code: "en", name: 'English', language: "en-US", file: "en.json"}
    ]
  },
  css: ['@/assets/scss/main.scss'],
})