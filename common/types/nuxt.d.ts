import { getPageName, i } from 'plugins/general'; // Обновите путь до вашего плагина

declare module '#app' {
    interface NuxtApp {
        $i: typeof i;
        $getPageName: typeof getPageName;
        $generateRoutePathDefault: string;
    }
}

export {};