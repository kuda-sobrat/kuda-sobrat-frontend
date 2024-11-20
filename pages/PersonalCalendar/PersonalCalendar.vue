<template>
  <div class="personal-calendar-page">
    <div class="page-content">
      [ PersonalCalendarPageContent ]
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.PersonalCalendar"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/personal-calendar',
    'ru': '/personal-calendar',
  }
})

</script>

<style>
@import "./style.scss";
</style>