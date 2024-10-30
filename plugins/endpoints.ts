
export default defineNuxtPlugin((nuxtApp) => {
    const apiBase: string = nuxtApp.$config.public.apiBase

    // Создаем экземпляр Axios с базовыми настройками
    const instance = {

    }

    // Добавляем экземпляр Axios в контекст Nuxt
    // nuxtApp.provide('axios', instance)
})