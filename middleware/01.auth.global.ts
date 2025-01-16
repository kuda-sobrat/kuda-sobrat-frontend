// import {useUserStore} from "~/stores/user";

import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useAuthStore()
    userStore.init()

    const excludedPaths = [
        '/help',
        '/test',
    ];

    if (to.path === '/logout') {
        await userStore.reset()
    }

    if (to.path === '/auth' && userStore.token && userStore.user) {
        return navigateTo('/')
    }

    if (to.path === '/auth' || to.path === '/' || excludedPaths.includes(to.path) || to.path.match(/^\/api\//i)) return

    if (!userStore.user || !userStore.token) {
        return navigateTo('/auth')
    }
})