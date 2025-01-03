<template>
  <div class=event-post-content>
    <div class="overflow-auto">
      <h2 class="event-post-content__title">
        {{ data.name }}
      </h2>
      <span class="event-post-content__description">
        {{ data.description }}
      </span>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 items-center mt-4">
      <div class="font-semibold text-primary">Куда?</div>
      <div class="event-post-content__location">
        {{ data.location_name }}
      </div>
      <div class="font-semibold text-primary">Когда?</div>
      <div class="event-post__datetime">
        <div class="text-[18px]">
          {{ formatTimeIntl(startDate) }}
        </div>
        <div class="text-[14px]">
          {{ formatDateDayOfWeekIntl(startDate) }}
        </div>
      </div>
      <div v-if="endDate" class="font-semibold text-primary">До?</div>
      <div v-if="endDate" class="event-post__datetime">
        <div class="text-[18px]">
          {{ formatTimeIntl(endDate) }}
        </div>
        <div class="text-[14px]">
          {{ formatDateDayOfWeekIntl(endDate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {EventPost} from "~/common/types/common";
import {formatDateDayOfWeekIntl, formatTimeIntl} from "~/common/composables/useHelpers";
import type {ComputedRef} from "vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostContent"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = defineProps<{
  data: EventPost
}>()

const startDate: ComputedRef<Date | null> = computed(() => {
  return props.data.start_datetime ? new Date(props.data.start_datetime) : null
})

const endDate: ComputedRef<Date | null> = computed(() => {
  return props.data.end_datetime ? new Date(props.data.end_datetime) : null
})
</script>

<style lang="scss">
@import "./style.scss";
</style>