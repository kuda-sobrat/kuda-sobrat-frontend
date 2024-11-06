<template>
  <div class="test-page">
    <div class="page-content">
      [ TestPageContent ]
      {{ loader }}
      {{ data }}
      <button @click="onClick()">
        Нажми на кнопку
      </button>
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import ExampleEndpoint from "~/common/api/endpoints/ExampleEndpoint";
import {useLoader} from "~/common/composables/useLoader.ts";

// i18
const i18nPrefix = "pages.Test"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const loader = useLoader()

defineI18nRoute({
  paths: {
    'en': '/test',
    'ru': '/test',
  }
})

const data = ref()
// const data = new ExampleEndpoint().call()

async function onClick() {
  data.value = await new ExampleEndpoint().call()
}

</script>

<style>
@import "./style.scss";
</style>