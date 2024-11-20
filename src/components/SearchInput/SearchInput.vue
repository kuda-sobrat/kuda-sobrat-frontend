<template>
  <div class=search-input__wrapper>
    <v-input
        class="search-input"
        v-model="model"
        v-bind="$attrs"
    >
      <template #inner-left>
        <TestIcon class="w-6 h-6"/>
      </template>
    </v-input>

  </div>
</template>

<script setup lang='ts'>
import TestIcon from 'assets/icons/test.svg'
import { useDefaultState } from './composables/useDefault'
import VInput from "~/src/components/VInput/VInput.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.SearchInput"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel()
</script>

<style lang="scss">
@import "./style.scss";
</style>