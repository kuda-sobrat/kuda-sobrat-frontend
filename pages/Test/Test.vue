<template>
  <div class="test-page">
    <div class="page-content">
      {{ model.map(item => item.attributes.id) }}
      <cascade-list v-model="model" v-model:data="interests" :appearance-time="30"/>
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import {useStaticStore} from "~/stores/static.ts";

import CascadeList from "~/src/components/CascadeList/CascadeList.vue";

// i18
const i18nPrefix = "pages.Test"
const nuxtApp = useNuxtApp()

const staticStore = useStaticStore()
const interests = ref()
const model = ref([])

defineI18nRoute({
  paths: {
    'en': '/test',
    'ru': '/test',
  }
})

definePageMeta({
  layout: 'simple'
})

onMounted(async () => {
  // {key: 'interests', apiEndpoint: new GetInterestsEndpoint()}
  interests.value = (await staticStore.get('interests')).value
  // interests.value = staticStore.getValue('interests')
})

</script>

<style>
@import "./style.scss";
</style>