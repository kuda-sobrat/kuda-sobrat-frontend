<template>
  <a v-if="generated_link" :href="generated_link" class=community-card>
    <div class="community-card__image">
      ?
<!--      {{ image_url }}-->
    </div>
    <div class="community-card__body">
      {{ name }}
    </div>
  </a>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.CommunityCard"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = defineProps<{
  image_url?: string,
  name: string,
  generated_link?: string,
}>()
</script>

<style lang="scss">
@import "./style.scss";
</style>