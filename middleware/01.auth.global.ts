// import {useUserStore} from "~/stores/user";

import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useAuthStore()
    userStore.init()

    if (to.fullPath === '/logout') {
        userStore.reset()
    }

    if (to.fullPath === '/auth' && userStore.token && userStore.user) {
        return navigateTo('/')
    }
    if (to.fullPath === '/auth' || to.fullPath === '/' || to.fullPath.match(/^\/api\//i)) return

    if (!userStore.user || !userStore.token) {
        return navigateTo('/auth')
    }
})