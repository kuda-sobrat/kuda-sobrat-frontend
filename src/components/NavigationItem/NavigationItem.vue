<template>
  <nuxt-link class=navigation-item v-bind="$attrs" :to="model?.to">
    <div v-if="model?.logo">
      <Icon :icon="model.logo" class="icon"/>
    </div>
    <div>{{ model?.title }}</div>
  </nuxt-link>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {NavigationItem} from "~/common/types/common";
import {Icon} from "@iconify/vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.NavigationItem"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<NavigationItem>()
</script>

<style lang="scss">
@import "./style.scss";
</style>