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

export default defineNuxtPlugin(() => {
    return {
        provide: {
            getPageName: getPageName,
            i: i,
            generateRouteName: generateRouteName,
            generateRouteNameDefault: generateRouteNameDefault,
            generateRoutePathDefault: generateRoutePathDefault,
        }
    }
})