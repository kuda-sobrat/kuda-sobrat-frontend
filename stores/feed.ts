import {defineStore} from "pinia"
import GetSearchEndpoint from "~/common/api/endpoints/v1/event/GetSearch";
import GetFeedEndpoint from "~/common/api/endpoints/v1/event/GetFeed";

export const useFeedStore = defineStore('feed', {
    state: () => ({
        searchQuery: '',
        filters: {
            interest_ids: [],
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
                interest_ids: [],
                location: null,
                timeRange: null,
            };
        },
        getFunction(): (page: number) => Promise<any> {
            return async (page: number) => {
                // Формируем параметры запроса
                const params: any = {
                    query: this.searchQuery,
                    // Разворачиваем фильтры
                    ...this.filters,
                    page: page,
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