import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import type {EventPost} from "~/common/types/common";

export type Request = {
    latitude?: number,
    longitude?: number,
    interest_ids?: number[],
    per_page?: number,
    cursor?: number,
}

export type Response = EventPost[]

export default class GetFeedEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = '/events/feed'
        this.method = ApiMethods.GET
    }
}