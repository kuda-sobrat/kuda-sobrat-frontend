<template>
  <div class=events-feed-module>
    <content-area>
      <event-post v-for="(item, key) in eventPosts" :key="key" v-model="eventPosts[key]">

      </event-post>
      <template #addition>
        <div class="tile">
          [Фильтры и прочее]
        </div>
      </template>
    </content-area>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import EventPost from "~/src/components/EventPost/EventPost.vue";
import type {EventPost as EventPostType} from "~/common/types/common.ts";
import ContentArea from "~/src/components/ContentArea/ContentArea.vue";
import GetEventsEndpoint from "~/common/api/endpoints/v1/event/GetEventsEndpoint";
const ctx = useDefaultState()

// i18
const i18nPrefix = "modules.EventsFeed"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const eventPosts = ref<EventPostType[] | undefined>()

onMounted(async () => {
  eventPosts.value = await (new GetEventsEndpoint()).call()
  console.log(eventPosts)
})
</script>

<style lang="scss">
@import "./style.scss";
</style>