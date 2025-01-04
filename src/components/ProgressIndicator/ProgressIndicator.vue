<template>
  <div class=progress-indicator>
    <div v-for="(state, index) in structure" :class="{
      'progress-indicator_active': Array.isArray(structure[index]) ? isActive(structure[index]) : structure[index].state,
      'progress-indicator__dot': !Array.isArray(structure[index]),
      'progress-indicator__block': Array.isArray(structure[index])
    }" @click="interactive ? active = (Array.isArray(structure[index]) ? structure[index][0].index : structure[index].index) : null"
    />
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.ProgressIndicator"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const active = defineModel<number>()
const count = defineModel<number>('count')

const props = withDefaults(defineProps<{
  interactive?: boolean
  structure?: any
}>(), {
  interactive: true,
  structure: true
})

function isActive(items: { state: boolean, index: number }[]) {
  for (const key in items) {
    if (Array.isArray(items[key]) ? isActive(items[key]) : items[key].state) {
      return true
    }
  }
  return false
}
</script>

<style lang="scss">
@import "./style.scss";
</style>