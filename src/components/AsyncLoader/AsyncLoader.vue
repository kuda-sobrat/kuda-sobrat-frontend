<template>
  <div class=async-loader__wrapper>
    <suspense>
      <template #default>
        <slot/>
      </template>
      <template #fallback>
        <div class="async-loader">
          Загрузка компонента...
        </div>
      </template>
    </suspense>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.AsyncLoader"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)
</script>

<style lang="scss">
@import "./style.scss";
</style>