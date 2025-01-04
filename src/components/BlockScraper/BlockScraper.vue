<template>
  <div class=block-scraper>
    <div class="block-scraper__body contents" ref="mainRef">
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
import {nextTick, onMounted} from "~/.nuxt/imports";
import VButton from "~/src/components/VButton/VButton.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.BlockScraper"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<number>({
  default: 0
})
const count = defineModel<number>('count', {
  default: 0
})
const structure = defineModel<any[]>('structure', {
  default: []
})
const mainRef = ref<HTMLElement>()
const childRefs = ref([])
const isInit = ref(false)

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

async function render() {
  let index = 0
  async function checkBlocks(children: HTMLCollection): Promise<any> {
    let structure = []
    for(const item of children) {
      const child: HTMLElement = item as HTMLElement
      // child.style.display = 'none'
      if (item.classList.contains('block')) {
        structure.push(await checkBlocks(item.children, true))
      } else {
        child.classList.remove('block-scraper__item_disabled')
        child.classList.add('block-scraper__item')
        if (index == model.value) {
          structure.push({
            state: true,
            index: index
          })
          child.classList.add('block-scraper__item_active')
        } else {
          structure.push({
            state: false,
            index: index
          })
          child.classList.add('block-scraper__item_disabled')
        }
        index++
      }
    }
    return structure
  }
  structure.value = await checkBlocks(mainRef.value?.children!)

  count.value = index
}

onMounted(() => {
  watch(model, async () => {
    await nextTick(() => {
      render()
    })
  }, {immediate: true})
  isInit.value = true
})

</script>

<style lang="scss">
@import "./style.scss";
</style>