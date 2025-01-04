import {defineStore} from "pinia"
import {ApiEndpoint} from "~/common/api/ApiEndpoint";
import type {CookieRef} from "nuxt/app";
import {useCookie} from "nuxt/app";
import {next} from "sucrase/dist/types/parser/tokenizer";

export interface StoreOptions {
    apiEndpoint?: ApiEndpoint<any, any>
    defaultValue?: any
    ttl?: number
}

type CookieData = {
    data: any,
}

export const useStaticStore = defineStore("static", () => {
    // Значение по умолчанию для TTL (время жизни данных в секундах)
    const DEFAULT_TTL = 24 * 60 * 60 * 60 * 60 // 24 часа
    const nuxtApp = useNuxtApp()

    async function setup(key: string, cookie: CookieRef<any>): Promise<CookieRef<any>> {
        const setup: StoreOptions = nuxtApp.$cookies[key]

        cookie.value = setup.apiEndpoint ? await setup.apiEndpoint.call() : undefined
        return cookie;
    }

    /**
     * Получает информацию по ключу, при необходимости отправляет запрос к API
     */
    async function get<T>(key: string): Promise<CookieRef<any> | undefined> {
        // Проверяем, есть ли значение уже в состоянии или cookies
        let cookie = useCookie(key)

        if (cookie.value !== undefined) {
            return cookie
        }

        return await setup(key, cookie)
    }

    return {
        get,
    }
})