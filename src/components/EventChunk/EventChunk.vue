<template>
  <div class=event-chunk style="all: inherit">
<!-- TODO: Loader -->
    <event-post v-for="(item, key) in model" :key="key" v-model="model[key]"/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import GetFeedEndpoint from "~/common/api/endpoints/v1/event/GetFeed";
import type {EventPost as EventPostType} from "~/common/types/common.ts";
import EventPost from "~/src/components/EventPost/EventPost.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventChunk"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = withDefaults(defineProps<{
  chunkId?: any
  perPage?: number
}>(), {
  perPage: 20
})
const model = defineModel<EventPostType[] | undefined>()
const total = defineModel<number>('total')
const isLoaded = defineModel<boolean>('isLoaded', {
  default: false
})

onMounted(async () => {
  const request = new GetFeedEndpoint()
  await (request).call({
    cursor: props.chunkId,
    per_page: props.perPage
  }).then((data) => {
    model.value = data
    isLoaded.value = true
    total.value = request.responseOriginal.value.total
  })
})
</script>

<style lang="scss">
@import "./style.scss";
</style>