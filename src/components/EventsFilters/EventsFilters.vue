<template>
  <div class="events-filters">
    <div class="flex flex-col">
      <h2 class="ml-1">
        Выбрать:
      </h2>
      <div class="grid max-lg:grid-cols-2 gap-1">
        <div class="events-filters__item" :class="{'events-filters__item_active': activeFilterIndex == 0}" @click="setActiveFilterIndex(0)">по интересам</div>
        <div class="events-filters__item" :class="{'events-filters__item_active': activeFilterIndex == 1}" @click="setActiveFilterIndex(1)">по популярности</div>
        <div class="events-filters__item" :class="{'events-filters__item_active': activeFilterIndex == 2}" @click="setActiveFilterIndex(2)">по геолокации</div>
        <div class="events-filters__item" :class="{'events-filters__item_active': activeFilterIndex == 3}" @click="setActiveFilterIndex(3)">по времени</div>
        <div class="events-filters__item" :class="{'events-filters__item_active': activeFilterIndex == 4}" @click="setActiveFilterIndex(4)">по цене</div>
      </div>
    </div>
    <div class="absolute top-[100%] right-0 lg:w-[175%] max-lg:w-full mt-2">
      <div v-show="activeFilterIndex != undefined" class="events-feed-module__filters-modal bg-white pl-3 pr-1.5 py-1.5 rounded-xl drop-shadow-md">
        <!--              <div class="modal__close_mobile-wrapper" @click="escState ? state = !state : undefined">-->
        <!--                <div class="modal__close modal__close_mobile" :class="{'modal__close_disabled': !escState}"/>-->
        <!--              </div>-->

        <component class="events-feed-module__modal-close" :is="getIconComponent('/ui/close.svg')" alt="Выход" @click="activeFilterIndex = undefined"/>
        <block-scraper v-model="activeFilterIndex">
          <div>
            <h2>Интересы</h2>
            <cascade-list v-model:data="interests" :active-level="0" :appearance-time="50"/>
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
          <v-button size="sm">
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
import L from 'leaflet'

// i18
const i18nPrefix = "components.EventsFilters"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const activeFilterIndex = ref()
const staticStore = useStaticStore()
const interests = ref()

function setActiveFilterIndex(index: number) {
  activeFilterIndex.value = activeFilterIndex.value == undefined || activeFilterIndex.value != index ? index : undefined
}

onMounted(async () => {
  interests.value = (await staticStore.get('interests')).value
  console.log(L)
})
</script>

<style lang="scss">
@import "./style.scss";
</style>