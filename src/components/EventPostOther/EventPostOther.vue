<template>
  <div v-if="model" class=event-post-other>
    <div class="ml-2 flex flex-row gap-1 relative">
      <div class="event-post-other__participation blocked" :class="{'event-post-other__participation_active': eventParticipationState}">
<!--        <img src="/common/Заблокировано.png" alt="Заблокировано">-->
<!--        <span>-->
<!--          {{ model.attendees + (eventParticipationState ? 1 : 0) }}-->
<!--        </span>-->
      </div>
      <event-participation-button v-model="eventParticipationState" @click="submitParticipationState"/>
    </div>

    <div class="active:fill-coral cursor-pointer" @click="onShare">
      <component class="event-participation-button__image"
                 :is="getIconComponent('/ui/share.svg')"
                 alt="Поделиться"
      />
    </div>


  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {getIconComponent} from "~/common/composables/useIcons";
import type {EventPost} from "~/common/types/common";
import EventParticipationButton from "~/src/components/EventParticipationButton/EventParticipationButton.vue";
import {copyToClipboard} from "~/common/composables/useHelpers";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostOther"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<EventPost>()
const eventParticipationState = ref(false)

function submitParticipationState() {

}

function onShare() {
  copyToClipboard(window.location.origin + '/help')
}
</script>

<style lang="scss">
@import "./style.scss";
</style>