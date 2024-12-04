import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import type {EventPost} from "~/common/types/common";

export type Request = {}

export type Response = EventPost[]

export default class GetEventsEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = '/user/events'
        this.method = ApiMethods.GET
    }
}