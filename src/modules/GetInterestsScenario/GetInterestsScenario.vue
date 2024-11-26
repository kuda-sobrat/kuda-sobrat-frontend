<template>
  <div class="get-interests-scenario-module scenario">
    <modal v-model="modalState">
      <template #headnote>
        Интересы
      </template>
      <template #default>
        <block-scraper v-model="activeBlock">
          <!-- Этап-1 -->
          <div>
            <span>
              Добро пожаловать! Давайте настроим ваш персональный опыт.
            </span>
            <br/>
            <span>
              Выберите до четырех интересов (макс. 4)
            </span>
            <div class="scenario__grid">
              <div v-for="(item, key) in interests" class="scenario__select-card">
                <lazy-nuxt-img :src="`/scenarios/interests/${interests[key].attributes.id}.png`" :alt="interests[key].attributes.name"/>
                <div class="absolute bottom-0">
                  {{ interests[key].attributes.name }}
                </div>
              </div>
            </div>
          </div>
          <!-- Этап-2 -->
          <div class="max-h-[70vh] h-[100%]">
            Hello
          </div>
        </block-scraper>
      </template>
      <template #footnote>
        <v-button @click="activeBlock++">
          Далее
        </v-button>
      </template>
    </modal>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import Modal from "~/src/components/Modal/Modal.vue";
import {useStaticStore} from "~/stores/static";
import type {CascadeItem} from "~/common/types/common";
import BlockScraper from "~/src/components/BlockScraper/BlockScraper.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "modules.GetInterestsScenario"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)
const staticStore = useStaticStore()
const interests = ref<CascadeItem[] | undefined>()

const modalState = ref(true)
const activeBlock = defineModel<number>('activeBlock', {
  default: 0
})

onMounted(async () => {
  interests.value = (await staticStore.get('interests')).value
})
</script>

<style lang="scss">
@import "./style.scss";
</style>