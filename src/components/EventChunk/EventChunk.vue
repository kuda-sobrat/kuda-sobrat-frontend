<template>
  <div v-if="modelData" class=event-chunk style="all: inherit">
<!-- TODO: Loader -->
    <event-post v-for="(item, key) in modelData" :key="key" v-model="modelData[key]" @open="onOpen"/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {EventPost as EventPostType} from "~/common/types/common.ts";
import EventPost from "~/src/components/EventPost/EventPost.vue";
import type {AsyncFunction} from "type-fest/source/async-return-type";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventChunk"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = withDefaults(defineProps<{
  chunkId?: any
  perPage?: number
  method: AsyncFunction
}>(), {
  perPage: 20,
})
const modelData = defineModel<EventPostType[] | undefined>('data')
const model = defineModel<EventPostType | undefined>()
const isLoaded = defineModel<boolean>('isLoaded', {
  default: false
})

function onOpen(post: EventPostType) {
  model.value = post
}

onMounted(async () => {
  modelData.value = await props.method()
  isLoaded.value = true
})
</script>

<style lang="scss">
@import "./style.scss";
</style>