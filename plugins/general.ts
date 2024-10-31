import tailwindConfig from "~/tailwind.config";

const getPageName = (hierarchy: string) => {
    const parts = hierarchy.split("/");
    return `${parts.join("-")}-${parts.slice(-1)}`
}


const i = (prefix: string): Function => {
    return (key: string) => {
        const fullKey = `${prefix}.${key}`
        const value = useI18n().t(fullKey)
        return value !== fullKey ? value : `[ ${key} ]`
    }
}


function generateScreenMethods(nuxtApp): {[key: string]: any} {
    const screenWidth = ref<number>(window.innerWidth);

    // Функция для обновления ширины экрана
    const updateScreenSize = () => {
        screenWidth.value = window.innerWidth;
    };

    // Добавление обработчика события resize
    window.addEventListener('resize', updateScreenSize);

    // Очистка обработчика при уничтожении компонента
    nuxtApp.hook('app:mounted', () => {
        updateScreenSize(); // Убедитесь, что ширина загружается правильно при монтировании
    });

    // Убедитесь в том, что обработчик удаляется, когда приложение уничтожается
    nuxtApp.hook('app:unmounted', () => {
        window.removeEventListener('resize', updateScreenSize);
    });

    const screens = tailwindConfig.theme.screens;
    let methods: {[key: string]: any} = {}

    Object.entries(screens).forEach(([key, value]) => {
        methods[key] = computed(() => {
            return !(screenWidth.value > parseInt(value, 10))
        })
    })

    methods.screenWidth = screenWidth

    return methods
}

function generateRouteName(
    pageName: string,
    locale: string = 'ru',
    separator: string = '__',
    defaultLocale: string = 'default'
): string {
    // Преобразуем название страницы в нижний регистр и заменяем пробелы на дефисы
    const normalizedPageName = pageName.replace(/\s+/g, '-');
    // Учитываем структуру файлов и название маршрута
    const routeName = `${normalizedPageName}-${normalizedPageName}`;
    // Собираем полное имя маршрута с учётом локали и разделителя
    return `${routeName}${separator}${locale}${separator}${defaultLocale}`;
}

function generateRouteNameDefault(pageName: string): string {
    return generateRouteName(pageName, useI18n().locale.value)
}

function generateRoutePathDefault(pageName: string): any
{
    return {
        name: generateRouteNameDefault(pageName)
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            getPageName: getPageName,
            i: i,
            generateRouteName: generateRouteName,
            generateRouteNameDefault: generateRouteNameDefault,
            generateRoutePathDefault: generateRoutePathDefault,
            ...generateScreenMethods(nuxtApp),
        }
    }
})