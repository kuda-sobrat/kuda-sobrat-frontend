<template>
  <div class=event-post-content>
    <h2 class="event-post-content__title">
      {{ data.name }}
    </h2>
    <span class="event-post-content__description">
          {{ data.description }}
        </span>
    <div class="event-post-content__location">
      {{ data.location_name }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {EventPost} from "~/common/types/common";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostContent"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = defineProps<{
  data: EventPost
}>()
</script>

<style lang="scss">
@import "./style.scss";
</style>