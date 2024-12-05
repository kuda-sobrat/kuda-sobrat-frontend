<template>
  <div class=content-area>
    <div class="container">
      <div class="content-area__main">
        <slot/>
      </div>
    </div>
    <div class="content-area__addition">
      <slot name="addition"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.ContentArea"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)
</script>

<style lang="scss">
@import "./style.scss";
</style>