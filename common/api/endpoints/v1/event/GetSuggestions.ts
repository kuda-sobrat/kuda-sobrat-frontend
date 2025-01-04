import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";

export type Request = {
    query: string,
}

export type Response = {
    name: string,
}[]

export default class GetSuggestionsEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = '/events/suggestions'
        this.method = ApiMethods.GET
    }
}