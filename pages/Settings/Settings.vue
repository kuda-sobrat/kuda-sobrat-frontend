<template>
  <div class="settings-page">
    <div class="page-content container">
      [ SettingsPageContent ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Settings"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/settings',
    'ru': '/settings',
  }
})

</script>

<style>
@import "./style.scss";
</style>