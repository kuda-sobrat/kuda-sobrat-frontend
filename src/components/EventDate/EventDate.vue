<template>
  <div class=event-date>
    <div class="text-[18px]">
      {{ formatTimeIntl(date) }}
    </div>
    <div class="text-[14px]">
      {{ formatDateDayOfWeekIntl(date) }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {formatDateDayOfWeekIntl, formatTimeIntl} from "~/common/composables/useHelpers";
import type {ComputedRef} from "vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventDate"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = defineProps<{
  date: string,
}>()

const date: ComputedRef<Date | null> = computed(() => {
  return props.date ? new Date(props.date) : null
})
</script>

<style lang="scss">
@import "./style.scss";
</style>