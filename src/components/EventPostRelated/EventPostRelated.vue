<template>
  <div class=event-post-related>
    <div class="event-post-related__communities">
      <div class="event-post-related__title">
        Связанные сообщества
      </div>
      <div class="event-post-related__body pl-2">
        ---
<!--        <div>-->
<!--          [1]-->
<!--        </div>-->
<!--        <div>-->
<!--          [2]-->
<!--        </div>-->
<!--        <div>-->
<!--          [3]-->
<!--        </div>-->
      </div>
    </div>

    <div v-if="group?.events" class="event-post-related__posts">
      <div class="event-post-related__title">
        Связанные записи
      </div>
      <div class="event-post-related__body">
        <div v-for="(event, key) in group.events" class="event-post-related__post" :key="key">
          <span class="event-post-related__item-caption">
            {{ event.name }}
          </span>
          <event-date class="float-right mt-1 min-w-[50%]" :date="event.start_datetime"/>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="flex items-center justify-center">
      <div class="spinner"/>

    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import GetEventsEndpoint from "~/common/api/endpoints/v1/group/GetEvents";
import type {EventGroup, EventPost} from "~/common/types/common";
import EventDate from "~/src/components/EventDate/EventDate.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostRelated"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<EventPost>()
const group = ref<EventGroup | undefined>()

const isLoading = ref(false)

onMounted(async () => {
  if (model.value?.event_group?.id) {
    try {
      isLoading.value = true
      let response = await new GetEventsEndpoint().call({group_id: model.value?.event_group.id})
      group.value = response.group
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
  }
})
</script>

<style lang="scss">
@import "./style.scss";
</style>

<style>
.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #5F6EAE 94%,#0000) top/9px 9px no-repeat,
  conic-gradient(#0000 30%,#5F6EAE);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>