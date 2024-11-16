<template>
  <div class="home-page">
    <div class="page-content">
      <div class="tile">
        hello assa
      </div>
    </div>
  </div>
</template>

<script setup="ts">
import { useNuxtApp } from '#app';
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Home"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/',
    'ru': '/',
  }
})

</script>

<style lang="scss">
@import "./style.scss";
</style>