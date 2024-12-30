// import {useUserStore} from "~/stores/user";

import {useAuthStore} from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useAuthStore()
    userStore.init()

    const excludedPaths = ['/help'];

    if (to.fullPath === '/logout') {
        await userStore.reset()
    }

    if (to.fullPath === '/auth' && userStore.token && userStore.user) {
        return navigateTo('/')
    }
    console.log(to.fullPath in excludedPaths,)

    if (to.fullPath === '/auth' || to.fullPath === '/' || excludedPaths.includes(to.fullPath) || to.fullPath.match(/^\/api\//i)) return

    if (!userStore.user || !userStore.token) {
        return navigateTo('/auth')
    }
})