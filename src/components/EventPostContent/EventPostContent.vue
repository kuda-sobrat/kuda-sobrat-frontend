<template>
  <div class=event-post-content>
    <div class="overflow-auto">
      <a :href="data.event_sources[0]?.generated_link" class="cursor-pointer">
        <h2 class="event-post-content__title">
          {{ data.name }}
        </h2>
      </a>
      <span class="event-post-content__description">
        {{ data.description }}
      </span>
    </div>
    <div class="mt-6 flex flex-col gap-1">
      <div class="flex flex-row">
        <a :href="data.event_sources[0]?.generated_link" class="cursor-pointer" >
          <component class="event-post-content__social" :is="getIconComponent('/social/vk.svg')" alt="VK"/>
        </a>
      </div>
      <div class="grid grid-cols-[auto_1fr] mt-1 gap-x-5 gap-y-1 items-center">
        <div v-if="typeText" class="col-span-2 flex gap-2 items-center">
          <span class="text-primary font-semibold">
            {{ typeText }}
          </span>
          <span v-if="data.cost" class="text-[16px]">
            {{ Math.floor(Number(data.cost)) }} руб.
          </span>
        </div>
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
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {type EventPost, EventType} from "~/common/types/common";
import {formatDateDayOfWeekIntl, formatTimeIntl} from "~/common/composables/useHelpers";
import type {ComputedRef} from "vue";
import {getIconComponent} from "~/common/composables/useIcons";
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

const typeText: ComputedRef<string> = computed(() => {
  switch (props.data.type) {
    case EventType.FREE:
      return 'Бесплатно!'
    case EventType.PAID:
      return props.data.cost ? 'Стоимость' : 'Платно'
    case EventType.BY_APPOINTMENT:
      return 'По записи'
    default:
      return ''
  }
})
</script>

<style lang="scss">
@import "./style.scss";
</style>