<template>
  <nuxt-link class=navigation-item v-bind="$attrs" :to="model?.to" @click="model?.callback ? model.callback() : undefined">
    <div v-if="model?.icon">
<!--      <img :src="`${model?.icon}`" :alt="model.title">-->
      <lazy-client-only>
        <component :is="getIconComponent(`${model?.icon}`)" :alt="model.title"/>
      </lazy-client-only>
    </div>
<!--    <div v-else-if="model?.logo">-->
<!--      <Icon :icon="model.logo" class="icon"/>-->
<!--    </div>-->
    <span class="navigation-item__title">{{ model?.title }}</span>
  </nuxt-link>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {NavigationItem} from "~/common/types/common";
import {getIconComponent} from "~/common/composables/useIcons";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.NavigationItem"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<NavigationItem>()
</script>

<style lang="scss">
@import "./style.scss";
</style>