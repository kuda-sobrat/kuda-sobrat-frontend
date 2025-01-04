<template>
  <div class="notifications-page">
    <div class="page-content">
      [ NotificationsPageContent ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Notifications"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/notifications',
    'ru': '/notifications',
  }
})

</script>

<style>
@import "./style.scss";
</style>