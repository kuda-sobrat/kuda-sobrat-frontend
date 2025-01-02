<template>
  <div v-if="model" class=event-post>
    <div class="event-post__content">
      <div class="event-post__body">
        <div>
          <h2 class="event-post__title" @click="emit('open', model)">
          {{ model?.name }}
          </h2>
          <span class="event-post__description" @click="emit('open', model)">
            {{ model?.description }}
          </span>
          <div class="event-post__location" @click="emit('open', model)">
            {{ model?.location_name }}
          </div>
        </div>

        <div class="event-post__footnote" :class="{'event-post__footnote_row': photoAttachments?.length <= 0}">
          <div class="event-post__datetime">
            <div class="text-[18px]">
              {{ formatTimeIntl(startDate) }}
            </div>
            <div class="text-[14px]">
              {{ formatDateDayOfWeekIntl(startDate) }}
            </div>
          </div>

          <div>
            <div class="event-post__reactions" @click="onClickStar">
              <component class="event-post__favorite"
                         :class="{'event-post__favorite_active': starState}"
                         :is="getIconComponent('/ui/star.svg')"
                         alt="Избранное"
                         @mouseenter="isStarHover = true"
                         @mouseleave="isStarHover = false"
              />
              <div>
                {{ model.attendees }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="photoAttachments?.length > 0" class="event-post__attachment" @click="emit('open', model)">
        <img :src="photoAttachments[0].url" class="w-full h-full object-cover" :alt="model?.name"/>
        <div class="gradient-overlay absolute inset-0"/>
<!--        <event-post-gallery v-if="photoAttachments?.length > 0" :data="photoAttachments" class="event-post__gallery"/>-->
      </div>
      <div class="event-post__interest-point"/>
    </div>
    <div class="event-post__footnote">
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import ImageGallery from "~/src/components/ImageGallery/ImageGallery.vue";
import type {EventPost} from "~/common/types/common";
import {getIconComponent} from "~/common/composables/useIcons";
import type {ComputedRef} from "vue";
import {formatDateDayOfWeekIntl, formatTimeIntl} from "~/common/composables/useHelpers";
import EventPostGallery from "~/src/components/EventPostGallery/EventPostGallery.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPost"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<EventPost>()
const photoAttachments = computed(() => {
  return model.value!.attachments?.filter(attachment => attachment.type === 'photo')
})

const isStarHover = ref(false)
const starState = ref(false)
const emit = defineEmits<{
  open: [
      post: EventPost
  ]
}>()

const startDate: ComputedRef<Date> = computed(() => {
  return new Date(model.value!.start_datetime)
})

function onClickStar() {
  starState.value = !starState.value
}
</script>

<style lang="scss">
@import "./style.scss";
</style>