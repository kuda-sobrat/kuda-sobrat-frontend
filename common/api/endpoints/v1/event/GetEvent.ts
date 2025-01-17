import {ApiEndpoint, ApiMethods} from "~/common/api/ApiEndpoint";
import type {EventPost} from "~/common/types/common";

export type Request = {
    id: number
}

export type Response = EventPost

export default class GetEvent extends ApiEndpoint<Request, Response> {
    constructor(id: number) {
        super();
        this.url = '/events/' + id
        this.method = ApiMethods.GET
    }
}