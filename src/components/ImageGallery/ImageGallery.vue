<template>
  <div class=image-gallery>
    <img :src="model[0].url" class="object-cover h-full" alt="Первое изображение"/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.ImageGallery"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel()
</script>

<style lang="scss">
@import "./style.scss";
</style>