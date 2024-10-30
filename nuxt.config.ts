import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  vite: {
    plugins: [
      Components({
        /* Автоматический импорт компонентов */
        dts: true, // Генерирует декларации типов (опционально)
        resolvers: [
          IconsResolver({
            prefix: 'Icon', // Префикс для компонентов иконок
          }),
        ],
      }),
      Icons({
        autoInstall: true, // Автоматическая установка иконок при необходимости
      }),
      svgLoader({
        // Опциональные настройки
        svgo: false, // Отключить оптимизацию SVGO при необходимости
        // defaultImport: 'component', // По умолчанию 'url'. Установите 'component' для импорта как компоненты Vue
      }),
    ],
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", '@nuxtjs/tailwindcss'],

  app: {
    head: {
      meta: [
        {name: "robots", content: "noindex"}
      ],
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js?render=explicit",
          // defer: true,
          async: true
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
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
  routeRules: {
    "/api/**": {
      proxy: {to: "http://127.0.0.1:8000/api/**"} // Local
    },
  }
})
