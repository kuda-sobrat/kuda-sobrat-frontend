<template>
  <div class=navigation-bar>
    <div v-for="(navigationItem, index) in navigationItems">
      <navigation-item v-model="navigationItems[index]"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {NavigationItem} from "~/common/types/common";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.NavigationBar"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

// TODO: navigationItems
const navigationItems: NavigationItem[] = reactive([
  {
    title: 'Профиль',
    name: 'profile',
    to: '',
    logo: ''
  },
  {
    title: 'Главная',
    name: 'home',
    to: '',
    logo: ''
  },
  {
    title: 'Личный календарь',
    name: 'personal_calendar',
    to: '',
    logo: ''
  },
  {
    title: 'Геолокация',
    name: 'geolocation',
    to: '',
    logo: ''
  },
])
</script>

<style lang="scss">
@import "./style.scss";
</style>