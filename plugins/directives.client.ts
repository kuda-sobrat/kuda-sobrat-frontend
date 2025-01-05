import clickOutside from '~/directives/v-click-outside';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', clickOutside);
});