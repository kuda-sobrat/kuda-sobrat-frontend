<template>
  <div class="tests-page">
    <div class="page-content">
      [ TestsPageContent ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Tests"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/tests',
    'ru': '/tests',
  }
})

</script>

<style>
@import "./style.scss";
</style>