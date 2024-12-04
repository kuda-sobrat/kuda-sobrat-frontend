<template>
  <div v-if="model" class=event-post>
    <div class="event-post__content">
      <div class="event-post__body">
      <span class="event-post__title">
        {{ model?.name }}
      </span>
        <span class="event-post__tags">
        {{ model?.tags }}
      </span>
        <span class="event-post__description">
        {{ model?.description }}
      </span>
        <div class="event-post__location">
          {{ model?.location }}
        </div>
        <div class="event-post__datetime">
          {{ model?.end_datetime }}
        </div>
      </div>
      <div v-if="withPhotoes" class="event-post__gallery">
        <image-gallery v-model="model.attachments.filter(attachment => attachment.type === 'photo').length" class="event-post__gallery"/>
      </div>
      <div class="event-post__interest-point"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import ImageGallery from "~/src/components/ImageGallery/ImageGallery.vue";
import type {EventPost} from "~/common/types/common";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPost"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<EventPost>()
const withPhotoes = computed(() => {
  return model.value!.attachments?.filter(attachment => attachment.type === 'photo')?.length > 0
})
</script>

<style lang="scss">
@import "./style.scss";
</style>