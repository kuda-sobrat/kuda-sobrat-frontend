<template>
  <div class=progress-carousel>
    <block-scraper class="h-[80%] flex-1 overflow-y-auto overflow-x-hidden" :class="[$attrs.class]" v-model="active" v-model:count="count">
      <slot/>
    </block-scraper>
    <div>
      <progress-indicator v-model="active" :count="count"/>
      <block-scraper v-if="props.type === 'scraper'" v-model="active">
        <slot name="footnote"/>
      </block-scraper>
      <slot name="footnote" v-else/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import BlockScraper from "~/src/components/BlockScraper/BlockScraper.vue";
import VButton from "~/src/components/VButton/VButton.vue";
import ProgressIndicator from "~/src/components/ProgressIndicator/ProgressIndicator.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.ProgressCarousel"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const active = defineModel<number>()
const count = ref<number>(0)

const props = defineProps<{
  type: 'scraper'
}>()

defineOptions({
  inheritAttrs: false,
});
</script>

<style lang="scss">
@import "./style.scss";
</style>