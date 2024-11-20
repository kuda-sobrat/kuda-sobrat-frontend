<template>
  <div v-if="data" class=cascade-list>
    <cascade-list-item v-for="(item, index) in data" v-model:item="data[index]"/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {CascadeItem, CascadeItemState} from "~/common/types/common";
import CascadeListItem from "~/src/components/CascadeList/components/CascadeListItem/CascadeListItem.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.CascadeList"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<CascadeItem[]>({
      default: () => []
})
const data = defineModel<CascadeItem[]>('data')
const props = withDefaults(defineProps<{
  activeLevel?: number,
  appearanceTime: number,
}>(), {
  activeLevel: 1,
  appearanceTime: 50
})

function setup(item: {state?: CascadeItemState}) {
  if (item.state?.level! <= props.activeLevel) {
    item.state!.visible = true
  }

  if (item.state?.level! <= props.activeLevel - 1) {
    item.state!.childrenVisible = true
  } else {
    item.state!.childrenVisible = false
  }
}

async function push(item: CascadeItem) {
  if (!model.value!.some(existing => existing.attributes === item.attributes)) {
    model.value.push(item)
    console.log(model.value)
  }
}

async function pop(item: CascadeItem) {
  const index = model.value!.findIndex(existing => existing.attributes === item.attributes)
  if (index !== -1) {
    model.value.splice(index, 1)
  }
}

// Предоставляем функцию через provide
provide('setup', setup);
provide('push', push);
provide('pop', pop);
provide('appearanceTime', props.appearanceTime);

</script>

<style lang="scss">
@import "./style.scss";
</style>