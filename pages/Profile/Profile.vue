<template>
  <div class="profile-page">
    <div class="page-content container">
      [ ProfilePageContent ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Profile"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/profile',
    'ru': '/profile',
  }
})

</script>

<style>
@import "./style.scss";
</style>