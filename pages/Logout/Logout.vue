<template>
  <div class="logout-page">
    <div class="page-content">
      Выход
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Logout"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  name: 'Logout',
  paths: {
    'en': '/logout',
    'ru': '/logout',
  }
})

</script>

<style>
@import "./style.scss";
</style>