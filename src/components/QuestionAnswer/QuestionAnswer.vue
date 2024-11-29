<template>
  <div class=question-answer @click="">
    <slot/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.QuestionAnswer"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)


</script>

<style lang="scss">
@import "./style.scss";
</style>