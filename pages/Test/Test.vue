<template>
  <div class="test-page">
    <div class="page-content">
      <div class="p-2 flex flex-col gap-2">
        <div class="container">
          <event-post>
            <template #title>
              Название мероприятия
            </template>
            <template #description>
              Описание мероприятия бла-бла-бла
            </template>
            <template #location>
              18:00 Суббота, 24
            </template>
            <template #tags>
              18:00 Суббота, 24
            </template>
          </event-post>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import {useStaticStore} from "~/stores/static.ts";
import EventPost from "~/src/components/EventPost/EventPost.vue";

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