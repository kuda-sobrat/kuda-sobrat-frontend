import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const apiBase: string = nuxtApp.$config.public.apiBase
    // Создаем экземпляр Axios с базовыми настройками
    const instance = axios.create({
        baseURL: apiBase,
        // Другие настройки, например, заголовки
    })

    // Добавляем интерсепторы запросов и ответов, если необходимо
    instance.interceptors.request.use(config => {
        // Например, добавление токена аутентификации
        // const token = useCookie('token').value
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    }, error => {
        return Promise.reject(error)
    })

    instance.interceptors.response.use(response => {
        return response
    }, error => {
        // Глобальная обработка ошибок
        return Promise.reject(error)
    })

    // Добавляем экземпляр Axios в контекст Nuxt
    nuxtApp.provide('axios', instance)
})