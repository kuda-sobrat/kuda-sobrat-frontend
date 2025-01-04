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
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    '@nuxtjs/tailwindcss',
    "@nuxt/image",
    '@nuxtjs/leaflet',
    "vue3-carousel-nuxt",
  ],

  app: {
    head: {
      meta: [
        {name: "robots", content: "noindex"}
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      script: [
        {
          hid: 'yandex-metrika',
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          
          ym(99404238, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
          });`
        }
      ],
      noscript: [
        {
          hid: 'yandex-metrika-noscript',
          innerHTML: `<div><img src="https://mc.yandex.ru/watch/99404238" style="position:absolute; left:-9999px;" alt="" /></div>`
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'yandex-metrika': ['innerHTML'],
        'yandex-metrika-noscript': ['innerHTML']
      }
    }
  },
  runtimeConfig: {
    public: {
      base: '/',
      apiBase: '/api',
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