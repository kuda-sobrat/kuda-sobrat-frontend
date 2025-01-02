<template>
  <div v-if="data" class=event-post-other>
    <div class="event-post__datetime">
      <div class="text-[18px]">
        {{ formatTimeIntl(new Date(data.start_datetime)) }}
      </div>
      <div class="text-[14px]">
        {{ formatDateDayOfWeekIntl(new Date(data.start_datetime)) }}
      </div>
    </div>
    <div>
      <div class="event-post__reactions">
        <component class="event-post__favorite"
                   :class="{'event-post__favorite_active': false}"
                   :is="getIconComponent('/ui/star.svg')"
                   alt="Избранное"
        />
        <div>
          {{ data.attendees }}
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {getIconComponent} from "~/common/composables/useIcons";
import {formatDateDayOfWeekIntl, formatTimeIntl} from "~/common/composables/useHelpers";
import type {EventPost} from "~/common/types/common";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostOther"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const data = defineModel<EventPost>()
</script>

<style lang="scss">
@import "./style.scss";
</style>