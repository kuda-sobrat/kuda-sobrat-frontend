<template>
  <div class="events-filters">
    <div class="flex flex-col">
      <h2 class="ml-1">
        Приоритеты:
      </h2>
      <div class="grid max-lg:grid-cols-2 gap-1">
        <div class="events-filters__item" :class="{'events-filters__item_active': activeFilterIndex == 0 || fixedIndex == 0}" @click="setActiveFilterIndex(0)">по интересам</div>
        <div class="events-filters__item" :class="{'events-filters__item_active': activeFilterIndex == 1}" @click="setActiveFilterIndex(1)">по популярности</div>
        <div class="events-filters__item blocked" :class="{'events-filters__item_active': activeFilterIndex == 2}">
          <img src="/common/Заблокировано.png" class="float-left mr-1" alt="Заблокировано">
          по геолокации
        </div>
        <div class="events-filters__item blocked" :class="{'events-filters__item_active': activeFilterIndex == 3}">
          <img src="/common/Заблокировано.png" class="float-left mr-1" alt="Заблокировано">
          по времени
        </div>
        <div class="events-filters__item blocked" :class="{'events-filters__item_active': activeFilterIndex == 4}">
          <img src="/common/Заблокировано.png" class="float-left mr-1" alt="Заблокировано">
          по цене
        </div>
      </div>
    </div>
    <div v-if="activeFilterIndex != 1" class="absolute top-[100%] right-0 lg:w-[175%] max-lg:w-full mt-2">
      <div v-show="activeFilterIndex != undefined" class="events-feed-module__filters-modal bg-white pl-3 pr-1.5 py-1.5 rounded-xl drop-shadow-md">
        <component class="events-feed-module__modal-close" :is="getIconComponent('/ui/close.svg')" alt="Выход" @click="activeFilterIndex = undefined"/>
        <block-scraper v-model="activeFilterIndex">
          <div>
            <h2>Интересы</h2>
            <cascade-list v-model:model-value="selectedInterests" v-model:data="interests" :active-level="0" :appearance-time="50"/>
          </div>
          <div>

          </div>
          <div>
<!--            <LMap-->
<!--                style="height: 350px"-->
<!--                :zoom="6"-->
<!--                :center="[47.21322, -1.559482]"-->
<!--                :use-global-leaflet="true"-->
<!--            >-->
<!--              <LTileLayer-->
<!--                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"-->
<!--                  attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"-->
<!--                  layer-type="base"-->
<!--                  name="OpenStreetMap"-->
<!--              />-->
<!--            </LMap>-->
          </div>
        </block-scraper>
        <div class="mt-2">
          <v-button size="sm" @click="onSubmit">
            Искать
          </v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {getIconComponent} from "~/common/composables/useIcons";
import BlockScraper from "~/src/components/BlockScraper/BlockScraper.vue";
import CascadeList from "~/src/components/CascadeList/CascadeList.vue";
import {useStaticStore} from "~/stores/static";
import VButton from "~/src/components/VButton/VButton.vue";
const ctx = useDefaultState()

import {toReactive} from "@vue/reactivity";
import {useFeedStore} from "~/stores/feed";

// i18
const i18nPrefix = "components.EventsFilters"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const activeFilterIndex = ref()
const staticStore = useStaticStore()
const interests = ref()
const selectedInterests = ref([])
const feedStore = toReactive(useFeedStore())
const fixedIndex = ref()

function setActiveFilterIndex(index: number) {
  if (fixedIndex.value === index) {
    fixedIndex.value = undefined
    feedStore.filters.interest_ids = []
  } else {
    fixedIndex.value = undefined
    activeFilterIndex.value = activeFilterIndex.value == undefined || activeFilterIndex.value != index ? index : undefined

    switch (activeFilterIndex.value) {
      case 1:
        feedStore.resetFilters()
        break
    }
  }
}

function onSubmit() {
  switch (activeFilterIndex.value) {
    case 0:
      feedStore.filters.interest_ids = selectedInterests.value.map((item) => item.attributes.id)
      fixedIndex.value = 0
      break
  }
}

onMounted(async () => {
  interests.value = (await staticStore.get('interests')).value
})
</script>

<style lang="scss">
@import "./style.scss";
</style>