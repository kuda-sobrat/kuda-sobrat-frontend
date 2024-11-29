<template>
  <div class=progress-indicator>
<!--    {'progress-indicator__dot_active': n === active}-->
    <div v-for="n in count" class="progress-indicator__dot" :class="{'progress-indicator__dot_active': (n - 1) === active}" :key="n" @click="interactive ? active = n - 1 : null"/>
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
}>(), {
  interactive: true
})
</script>

<style lang="scss">
@import "./style.scss";
</style>