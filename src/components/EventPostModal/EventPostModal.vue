<template>
  <div class=event-post-modal v-if="model">
    <event-post-related class="event-post-modal__related"/>
    <event-post-content class="event-post-modal__content" :data="model"/>
    <event-post-gallery class="event-post-modal__gallery"/>
    <event-post-other class="event-post-modal__other" v-model="model"/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import EventPostRelated from "~/src/components/EventPostRelated/EventPostRelated.vue";
import EventPostContent from "~/src/components/EventPostContent/EventPostContent.vue";
import EventPostGallery from "~/src/components/EventPostGallery/EventPostGallery.vue";
import EventPostOther from "~/src/components/EventPostOther/EventPostOther.vue";
import type {EventPost} from "~/common/types/common";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostModal"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<EventPost>()
</script>

<style lang="scss">
@import "./style.scss";
</style>