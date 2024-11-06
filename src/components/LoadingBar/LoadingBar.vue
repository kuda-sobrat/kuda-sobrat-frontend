<template>
  <div class=loading-bar__wrapper :class="{'loading-bar_active': state}">
    <div class="loading-bar" :style="{width: `${percentages}%`}"/>
    loader
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {useLoader} from "~/common/composables/useLoader";
const ctx = useDefaultState()
const loader = useLoader()

// i18
const i18nPrefix = "components.LoadingBar"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

let timer = undefined
const state = ref(!!loader.value.isLoading)

const percentages = ref(0)

watch(loader.value, (current) => {
  console.log('nice')
  if (loader.value.isLoading !== undefined) {
    if (loader.value.percentages) {
      percentages.value = loader.value.percentages
    } else {
      if (!current.isLoading) {
        clearTimeout(timer)
        percentages.value = 100
        setTimeout(() => {
          state.value = false
          percentages.value = 0
        }, 100)
      } else {
        percentages.value = 0
        state.value = true
        clearTimeout(timer)
        percentages.value += 10
        timer = setInterval(() => {
          if (percentages.value < 99) {
            percentages.value += 2
          } else {
            clearTimeout(timer)
          }
        }, 600)
      }
    }
  }
}, {deep: true, immediate: true})
</script>

<style lang="scss">
@import "./style.scss";
</style>