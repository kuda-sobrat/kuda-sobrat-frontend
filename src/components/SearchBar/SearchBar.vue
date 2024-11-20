<template>
  <div class=search-bar>
    <search-input/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import SearchInput from "~/src/components/SearchInput/SearchInput.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.SearchBar"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)
</script>

<style lang="scss">
@import "./style.scss";
</style>