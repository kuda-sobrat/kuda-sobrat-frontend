import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import type {EventGroup} from "~/common/types/common";

export type Request = {
    group_id: number,
}

export type Response = {
    group: EventGroup
}

export default class GetEventsEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.method = ApiMethods.GET
    }

    override async call(request?: Request): Promise<Response> {
        this.url = "/group/" + request?.group_id + "/events/"

        return super.call(request);
    }
}