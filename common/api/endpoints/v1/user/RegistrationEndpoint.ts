import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import {useAuthStore} from "~/stores/auth";
import type {User} from "~/common/types/resources/user";

export type Request = {
    name?: string
    email?: string,
    password?: string
    password_confirmation?: string
}

export type Response = {
    token: string,
    user: User,
}

export default class RegistrationEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = 'register'
        this.method = ApiMethods.POST
    }

    override async afterCall(response: Response): Promise<void> {
        useAuthStore().setup(response)
    }
}