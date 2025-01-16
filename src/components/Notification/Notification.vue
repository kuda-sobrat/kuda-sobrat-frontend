<template>
  <div class=notification>
    {{ message }}
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.Notification"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = defineProps<{
  message: string
}>()
</script>

<style lang="scss">
@import "./style.scss";
</style>