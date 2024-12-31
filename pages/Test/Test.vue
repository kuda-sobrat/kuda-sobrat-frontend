<template>
  <div class="test-page">
    <div class="page-content">
      <div class="p-2 flex flex-col gap-2">
        <cascade-list v-model:data="interests"/>
        <div class="container">
        </div>
      </div>
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
  interests.value = (await staticStore.get('interests')).value
})

</script>

<style>
@import "./style.scss";
</style>