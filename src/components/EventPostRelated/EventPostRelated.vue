<template>
  <div class=event-post-related>
    <div v-if="model?.communities" class="event-post-related__communities">
      <div class="event-post-related__title">
        Сообщества
      </div>
      <div class="event-post-related__body pl-2">
        <community-card
            v-for="(community, index) in model?.communities"
            :generated_link="(model!.communities[index]?.social_links)?.length > 0 ? model!.communities[index]?.social_links[0]?.generated_link : undefined"
            :name="model!.communities[index]?.name"
        />
      </div>
    </div>

    <div v-if="model?.event_group?.events" class="event-post-related__posts">
      <div class="event-post-related__title">
        Связанные записи
      </div>
      <div class="event-post-related__body">
        <div v-for="(event, key) in model?.event_group.events" class="event-post-related__post" :key="key" @click="onEventPostChange(event)">
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
import type {EventPost} from "~/common/types/common";
import EventDate from "~/src/components/EventDate/EventDate.vue";
import CommunityCard from "~/src/components/CommunityCard/CommunityCard.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostRelated"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<EventPost>()
const router = useRouter()
const route = useRoute()

const isLoading = ref(false)

async function onEventPostChange(event: EventPost) {
  model.value = event
  // TODO: Изменение ссылки
  return router.push({path: route.path, query: {...route.query, event: event.id}})
}

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