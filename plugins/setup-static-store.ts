import clickOutside from '~/directives/v-click-outside';
import type {StoreOptions} from "~/stores/static";
import GetInterestsEndpoint from "~/common/api/endpoints/v1/interest/GetInterestsEndpoint";

export default defineNuxtPlugin((nuxtApp): any => ({
    provide: {
        cookies: {
            interests: {
                apiEndpoint: new GetInterestsEndpoint()
            }
        }
    }
}));