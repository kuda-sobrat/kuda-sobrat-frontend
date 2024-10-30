import {defineStore} from "pinia"
import type {CookieRef} from "#app";
import type {User} from "~/common/types/resources/user";

export const useAuthStore = defineStore("user", {
    state: (): {
        cookie: {
            token: CookieRef<any>
            user: CookieRef<any>
        },
        user: User | null,
        token: string | null,
    } => ({
        cookie: {
            token: useCookie<string | null>("auth_token", {
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            }),
            user: useCookie<object | null>("user", {
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            })
        },
        user: null,
        token: null,
    }),
    actions: {
        init() {
            this.token = this.cookie.token
            this.user = this.cookie.user

            return !!this.token && !!this.user;
        },

        setup(data: {token: string, user: User}) {
            this.token = data.token
            this.user = data.user

            this.cookie.token = data.token
            this.cookie.user = data.user

            return navigateTo('/')
        },

        async reset() {
            this.user = null
            this.token = null

            this.cookie.user = undefined
            this.cookie.token = undefined

            return navigateTo('/auth')
        }
    },
})