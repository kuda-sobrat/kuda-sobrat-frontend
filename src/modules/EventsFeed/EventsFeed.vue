<template>
  <div class=events-feed-module>
    <content-area>
      <div style="all: inherit">
        <event-chunk v-model="activePost" v-model:data="firstChunk" :method="functionInstance" :per-page="perPage" v-model:is-loaded="chunkStates[0]"/>
        <event-chunk v-if="feedStore.total && currentPages > 1" v-model="activePost" :method="functionInstance" v-for="i in currentPages - 1" :chunk-id="i + 1" v-model:is-loaded="chunkStates[i]"/>
        <div class="relative">
          <div v-if="!isEnded || isLoading" class="w-full flex items-center justify-center mt-2" :style="{marginTop: isLoading ? '33%' : ''}">
            <div class="events-feed-module__spinner"/>
          </div>
          <intersection-observer-trigger v-if="canLoadMore && !isEnded" class="absolute bottom-[200vh] h-[10px] bg-red-200 bg-opacity-0" @trigger="onIntersectionTrigger"/>
          <end-of-events-feed v-if="!isLoading"/>
          <intersection-observer-trigger v-if="canLoadMore && !isEnded" class="absolute bottom-[10vh] h-[10px] bg-red-200 bg-opacity-0" @trigger="onIntersectionTrigger"/>
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
import EventsFilters from "~/src/components/EventsFilters/EventsFilters.vue";
import Modal from "~/src/components/Modal/Modal.vue";
import EventPostModal from "~/src/components/EventPostModal/EventPostModal.vue";
import {useFeedStore} from "~/stores/feed";
import GetEvent from "~/common/api/endpoints/v1/event/GetEvent";
const ctx = useDefaultState()

// i18
const i18nPrefix = "modules.EventsFeed"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const firstChunk = ref<EventPostType[] | undefined>()
const perPage = 20
const chunkStates = reactive([])
const activePost = ref()
const currentPages = computed(() => {
  return chunkStates.length
})
const feedStore = useFeedStore()
const functionInstance = ref(feedStore.getFunction())
const isLoading = ref()
const route = useRoute()

const isEnded = computed(() => {
  return !(Math.ceil(feedStore.total / perPage) > currentPages.value)
})

const canLoadMore = computed(() => {
  for (const key in chunkStates) {
    if (chunkStates[key] === false) {
      return false
    }
  }
  return true
})

function onIntersectionTrigger(isIntersecting: boolean)
{
  if (isIntersecting) {
    chunkStates.push(false)
  }
}

watch(
    () => [feedStore.searchQuery, feedStore.filters],
    async () => {
      chunkStates[0] = false
      isLoading.value = true
      firstChunk.value = []
      functionInstance.value = feedStore.getFunction();
      firstChunk.value = await functionInstance.value()
      isLoading.value = false
      chunkStates[0] = true
    },
    { deep: true }
);

watch(activePost, async () => {
  const query = { ...route.query }
  if (!isLoading.value && activePost.value.id) {
    query.event = activePost.value.id
    isLoading.value = true
    activePost.value = await new GetEvent(activePost.value.id).call()
  } else {
    isLoading.value = false
  }
  query.event = activePost.value.id
  useRouter().push({query})
})
</script>

<style lang="scss">
@import "./style.scss";
</style>