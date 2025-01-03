import {defineStore} from "pinia"

export const useFeedStore = defineStore('feed', {
    state: () => ({
        searchQuery: '',
        filters: {
            interests: [],
            location: null, // { latitude: ..., longitude: ... }
            timeRange: null, // { start: ..., end: ... }
        },
    }),
    actions: {
        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
        setFilters(filters: any) {
            this.filters = { ...this.filters, ...filters };
        },
        resetFilters() {
            this.filters = {
                interests: [],
                location: null,
                timeRange: null,
            };
        },
        getFunction(): () => Promise<any> {
            return async () => {
                try {
                    // Формируем параметры запроса
                    const params: any = {
                        query: this.searchQuery,
                        // Разворачиваем фильтры
                        ...this.filters,
                    };

                    console.log(params)

                    // Преобразуем параметры в строку запроса
                    // const queryString = new URLSearchParams(params).toString();

                    // // Выполняем запрос к эндпоинту
                    // const response = await fetch(`/api/events/search?${queryString}`);

                    // Проверяем статус ответа
                    // if (!response.ok) {
                    //     throw new Error(`Ошибка HTTP: ${response.status}`);
                    // }

                    // Получаем данные из ответа
                    // const data = await response.json();

                    // Возвращаем данные
                    // return data;
                } catch (error) {
                    // Обрабатываем ошибки
                    console.error('Ошибка при запросе к эндпоинту:', error);
                    throw error;
                }
            };
        },
    },
});