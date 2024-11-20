import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import {useAuthStore} from "~/stores/auth";
import type {User} from "~/common/types/resources/user";

export type Request = {}

export type Response = {
    attributes: {
        id: number,
        name: string,
        description: string,
        is_paid: boolean,
    },
    children: Response
}[]

export default class GetInterestsEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = 'interests'
        this.method = ApiMethods.GET
    }
}