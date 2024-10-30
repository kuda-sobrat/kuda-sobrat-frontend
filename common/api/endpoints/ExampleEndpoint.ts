import {ApiEndpoint} from "~/common/api/ApiEndpoint";

export type Request = {
}

export type Response = {
    message: string,
    version: string
}

export default class ExampleEndpoint extends ApiEndpoint<Request, Response> {
    constructor() {
        super();
        this.url = 'test'
    }
}