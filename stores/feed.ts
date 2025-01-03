import {defineStore} from "pinia"
import GetSearchEndpoint from "~/common/api/endpoints/v1/event/GetSearch";
import GetFeedEndpoint from "~/common/api/endpoints/v1/event/GetFeed";

export const useFeedStore = defineStore('feed', {
    state: () => ({
        searchQuery: '',
        filters: {
            interests: [],
            location: null, // { latitude: ..., longitude: ... }
            timeRange: null, // { start: ..., end: ... }
        },
        total: null
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
                // Формируем параметры запроса
                const params: any = {
                    query: this.searchQuery,
                    // Разворачиваем фильтры
                    ...this.filters,
                };

                let results;

                if (params.query) {
                    const request = new GetSearchEndpoint()
                    results = await request.call(params);
                    this.total = request.responseOriginal.value.total
                } else {
                    const request = new GetFeedEndpoint()
                    results = await request.call(params);
                    this.total = request.responseOriginal.value.total
                }

                // Возвращаем результаты
                return results;
            };
        }
    },
});