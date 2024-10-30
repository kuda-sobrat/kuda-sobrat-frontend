<template>
  <div class="test-page">
    <div class="page-content container">
      [ TestPageContent ]
      {{ data }}
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import ExampleEndpoint from "~/common/api/endpoints/ExampleEndpoint";

// i18
const i18nPrefix = "pages.Test"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/test',
    'ru': '/test',
  }
})

const data = await new ExampleEndpoint().call()

</script>

<style>
@import "./style.scss";
</style>