<template>
  <button :class="['v-button', 'v-button_' + props.size, !state ? 'v-button_disabled' : '']">
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
      size?: 'sm' | 'md'
    }>(), {
      state: true,
      size: 'md'
    }
)

</script>

<style lang="scss">
@import "./style.scss";
</style>