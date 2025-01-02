<template>
  <div class=events-feed-module>
    <content-area>
      <div style="all: inherit">
        <event-chunk v-model="activePost" v-model:data="firstChunk" v-model:total="total" :per-page="perPage" v-model:is-loaded="chunkStates[0]"/>
        <event-chunk v-model="activePost" v-if="total" v-for="i in currentPages - 1" :chunk-id="i + 1" v-model:is-loaded="chunkStates[i]"/>
        <div class="relative">
          <intersection-observer-trigger v-if="canLoadMore && !isEnded" class="absolute bottom-[200vh] h-[10px] bg-red-200" @trigger="onIntersectionTrigger"/>
          <end-of-events-feed/>
          <intersection-observer-trigger v-if="canLoadMore && !isEnded" class="absolute bottom-[10vh] h-[10px] bg-red-200" @trigger="onIntersectionTrigger"/>
        </div>
      </div>
      <template #addition>
        <events-filters/>
      </template>
    </content-area>
    <modal v-model="activePost">
      <event-post-modal v-model="activePost"/>
    </modal>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {EventPost as EventPostType} from "~/common/types/common.ts";
import ContentArea from "~/src/components/ContentArea/ContentArea.vue";
import EventChunk from "~/src/components/EventChunk/EventChunk.vue";
import IntersectionObserverTrigger from "~/src/components/IntersectionObserverTrigger/IntersectionObserverTrigger.vue";
import EndOfEventsFeed from "~/src/components/EndOfEventsFeed/EndOfEventsFeed.vue";
import {useStaticStore} from "~/stores/static";
import EventsFilters from "~/src/components/EventsFilters/EventsFilters.vue";
import Modal from "~/src/components/Modal/Modal.vue";
import EventPostModal from "~/src/components/EventPostModal/EventPostModal.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "modules.EventsFeed"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const firstChunk = ref<EventPostType[] | undefined>()
const total = ref()
const perPage = 20
const chunkStates = reactive([])
const interests = ref()
const staticStore = useStaticStore()
const activePost = ref()
const currentPages = computed(() => {
  return chunkStates.length
})
const activeFilterIndex = ref()

const canLoadMore = computed(() => {
  for (const key in chunkStates) {
    if (chunkStates[key] === false) {
      return false
    }
  }
  return true
})

const isEnded = computed(() => {
  return !(Math.ceil(total.value / perPage) > currentPages.value)
})

function onIntersectionTrigger(isIntersecting: boolean)
{
  if (isIntersecting) {
    console.log('currentPages.value', currentPages.value)
    chunkStates.push(false)
  }
  console.log(isIntersecting)
}
onMounted(async () => {
  interests.value = (await staticStore.get('interests')).value
  if (firstChunk.value) {
    console.log(firstChunk.value)
  }
  // eventPosts.value = await (new GetEventsEndpoint()).call()
  // console.log(eventPosts)
})
</script>

<style lang="scss">
@import "./style.scss";
</style>