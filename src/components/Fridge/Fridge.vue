<template>
  <div class=fridge-wrapper @click="model = false">
    <div class=fridge :class="{'fridge_active' : model}" @click.stop="">
      <slot/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.Fridge"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<boolean>({
  default: false,
})
</script>

<style lang="scss">
@import "./style.scss";
</style>