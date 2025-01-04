import {useAuthStore} from "~/stores/auth";
import type {AxiosInstance} from "axios";
import {useLoader} from "~/common/composables/useLoader";

export enum ApiMethods {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
}

interface ResponseOriginal<Response> {
    message?: string
    data: Response
    version: string
}

export interface ApiAfterCall<Response> {
    afterCall(response: Response): Promise<void>
}

export class ApiEndpoint<Request, Response> implements ApiAfterCall<Response> {
    protected method: ApiMethods = ApiMethods.GET
    protected url: string = 'undefined'
    public loader = useLoader()
    public response: Ref<Response | undefined> = ref()
    public responseOriginal: Ref<ResponseOriginal<Response>> = ref()
    protected axios?: AxiosInstance = undefined

    constructor() {
        const userStore = useAuthStore()
        this.axios = useNuxtApp().$axios.create({
            headers: {
                Authorization: userStore.token ? `Bearer ${userStore.token}` : undefined
            }
        })
    }

    public async call(request?: Request): Promise<Response> {
        this.loader.value.isLoading = true
        const response: Promise<ResponseOriginal<Response>> = this[this.method](request)
        this.handleResponse(await response)
        this.responseOriginal.value = (await response)
        this.response.value = this.responseOriginal.value.data
        this.loader.value.isLoading = false
        this.afterCall(this.response.value)
        return this.response.value
    }

    protected async get(params?: Request): Promise<ResponseOriginal<Response>> {
        const userStore = useAuthStore()
        try {
            const response = await this.axios!.get(this.url, {
                headers: {
                    'Authorization': userStore.token ? `Bearer ${userStore.token}` : undefined
                },
                params
            })
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    protected async post(params?: Request): Promise<ResponseOriginal<Response>> {
        try {
            const response = await this.axios!.post(this.url, params)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    protected async put(params?: Request): Promise<ResponseOriginal<Response>> {
        try {
            const response = await this.axios!.post(this.url, params)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    protected async delete(params?: Request): Promise<ResponseOriginal<Response>> {
        try {
            const response = await this.axios!.delete(this.url, params)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    protected handleError(error: any): never {
        this.loader.value.isLoading = false
        // Обработка ошибок
        if (error.response) {
            // Сервер вернул ответ с кодом ошибки
            // TODO: Уведомление на сообщение
            throw error.response.data
        } else if (error.request) {
            // Запрос был отправлен, но ответа не было получено
            console.error('No response received:', error.request)
            throw new Error('Сервер не ответил на запрос.')
        } else {
            // Произошла ошибка при настройке запроса
            console.error('Error in setting up request:', error.message)
            throw new Error('Произошла ошибка при отправке запроса.')
        }
    }

    protected handleResponse(response: ResponseOriginal<Response>): void {
        if (response.message) {
            // TODO: Уведомление на сообщение
        }
    }

    /**
     * Выполнить действия после
     *
     * @param response
     * @protected
     */
    async afterCall(response: Response): Promise<void> {

    }
}
