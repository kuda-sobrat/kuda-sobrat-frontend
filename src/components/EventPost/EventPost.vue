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
          <event-date :date="model?.start_datetime"/>

          <div class="flex gap-1 related">
            <div class="event-post__reactions related" @click="onClickStar">
              <div class="event-post-other__participation blocked" :class="{'event-post-other__participation_active': eventParticipationState}">
              </div>
              <event-participation-button v-model="model.participationState" @click="submitParticipationState"/>
              <a v-if="model?.event_sources[0]?.generated_link" :href="model.event_sources[0].generated_link" class="event-post__cost">
                {{ typeText }}
              </a>
              <div v-else class="event-post__cost">
                {{ typeText }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="photoAttachments?.length > 0" class="event-post__attachment" @click="emit('open', model)">
        <lazy-nuxt-img :src="photoAttachments[0].url" class="w-full h-full object-cover" :alt="model?.name"/>
        <div class="gradient-overlay absolute inset-0"/>
      </div>
      <div class="event-post__interest-point"/>
    </div>
    <div class="event-post__footnote">
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {type EventPost, EventType} from "~/common/types/common";
import type {ComputedRef} from "vue";
import EventParticipationButton from "~/src/components/EventParticipationButton/EventParticipationButton.vue";
import EventDate from "~/src/components/EventDate/EventDate.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPost"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<EventPost>()
const photoAttachments = computed(() => {
  return model.value!.attachments?.filter(attachment => attachment.type === 'photo')
})

const starState = ref(false)
const eventParticipationState = ref(false)
const emit = defineEmits<{
  open: [
      post: EventPost
  ]
}>()

const typeText: ComputedRef<string> = computed(() => {
  switch (model.value?.type) {
    case EventType.FREE:
      return 'Бесплатно!'
    case EventType.PAID:
      return model.value.cost ? Math.floor(Number(model.value.cost)) + 'руб.' : 'Унать стоимость'
    case EventType.BY_APPOINTMENT:
      return 'По записи'
    default:
      return ''
  }
})

const startDate: ComputedRef<Date> = computed(() => {
  return new Date(model.value!.start_datetime)
})

function submitParticipationState() {

}

function onClickStar() {
  starState.value = !starState.value
}
</script>

<style lang="scss">
@import "./style.scss";
</style>