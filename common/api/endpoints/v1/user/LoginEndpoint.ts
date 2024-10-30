import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import {useAuthStore} from "~/stores/auth";
import type {User} from "~/common/types/resources/user";

export type Request = {
    email?: string,
    password?: string
}

export type Response = {
    token: string,
    user: User,
}

export default class LoginEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = 'login'
        this.method = ApiMethods.POST
    }

    override async afterCall(response: Response): Promise<void> {
        useAuthStore().setup(response)
    }
}