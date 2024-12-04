<template>
  <button class=v-button :class="{'v-button_disabled': !state}">
    <slot/>
  </button>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'

const ctx = useDefaultState()

// i18
const i18nPrefix = "components.VButton"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const props = withDefaults(
    defineProps<{
      state?: boolean
    }>(), {
      state: true
    }
)

</script>

<style lang="scss">
@import "./style.scss";
</style>