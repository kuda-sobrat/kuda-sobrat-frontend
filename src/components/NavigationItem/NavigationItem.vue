<template>
  <nuxt-link :class="['navigation-item', model?.isBlocked ? 'navigation-item_blocked' : '']" v-bind="$attrs" :to="!model?.isBlocked ? model?.to : ''" @click="model?.callback ? model.callback() : undefined">
    <div v-if="model?.icon || model?.image" class="relative flex items-center justify-center">
      <img v-if="model?.image" :src="`${model?.image}`" :alt="model.title">
      <lazy-client-only v-else v-if="!model.isBlocked">
        <component :is="getIconComponent(`${model?.icon}`)" :alt="model.title"/>
      </lazy-client-only>
      <img v-if="model.isBlocked" class="navigation-item_blocked__blocked-image" src="/common/Заблокировано.png" alt="Заблокировано">
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