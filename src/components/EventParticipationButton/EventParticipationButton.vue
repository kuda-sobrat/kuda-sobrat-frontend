<template>
  <div class=event-participation-button :class="{'event-participation-button_active': model}" @click="model = !model">
    <component class="event-participation-button__image"
               :is="getIconComponent('/ui/star.svg')"
               alt="Избранное"
    />
    <div class="event-participation-button__text-wrapper">
      <span class="event-participation-button__text" :class="{'event-participation-button__text_active': model}">
      собираюсь
    </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {getIconComponent} from "~/common/composables/useIcons";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventParticipationButton"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<boolean>()
</script>

<style lang="scss">
@import "./style.scss";
</style>