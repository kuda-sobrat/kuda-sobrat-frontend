<template>
  <div class=block-scraper>
    <div ref="mainRef">
      <slot/>
    </div>
    <v-button v-if="props.previous" @click="toPrevious()">
      Предыдущий
    </v-button>
    <v-button v-if="props.next" @click="toNext()">
      Следующий
    </v-button>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {onMounted} from "~/.nuxt/imports";
import VButton from "~/src/components/VButton/VButton.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.BlockScraper"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<number>({
  default: 0
})
const mainRef = ref<HTMLElement>()
const childRefs = ref([])

const props = withDefaults(defineProps<{
  next?: boolean
  previous?: boolean
}>(), {
  next: false,
  previous: false
})

function toPrevious() {
  model.value--
}

function toNext() {
  model.value++
}

function render() {
  let index = 0
  for(const item of mainRef.value?.children!) {
    const child: HTMLElement = item as HTMLElement
    // child.style.display = 'none'
    child.classList.remove('block-scraper__item_disabled')
    child.classList.add('block-scraper__item')
    if (index == model.value) {
      child.classList.add('block-scraper__item_active')
    } else {
      child.classList.add('block-scraper__item_disabled')
    }
    index++
  }
}

onUpdated(() => {
  render()
})

onMounted(() => {
  watch(model, () => {
    render()
  }, {immediate: true})
})

</script>

<style lang="scss">
@import "./style.scss";
</style>