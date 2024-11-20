<template>
  <div class="events-page">
    <div class="page-content">
      [ EventsPageContent ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Events"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/events',
    'ru': '/events',
  }
})

</script>

<style>
@import "./style.scss";
</style>