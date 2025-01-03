import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import type {EventPost} from "~/common/types/common";

export type Request = {
    query: string,
}

export type Response = EventPost[]

export default class GetSearchEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = '/events/search'
        this.method = ApiMethods.GET
    }
}