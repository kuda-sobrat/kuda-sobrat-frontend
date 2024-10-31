<template>
  <div class="geolocation-page">
    <div class="page-content container">
      [ GeolocationPageContent ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Geolocation"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/geolocation',
    'ru': '/geolocation',
  }
})

</script>

<style>
@import "./style.scss";
</style>