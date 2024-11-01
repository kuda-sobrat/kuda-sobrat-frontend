<template>
  <div class=profile-link>
    <Icon icon="fe:user" class="header__icon"/>
    <div class="profile-link__menu-wrapper">
      <div class="profile-link__menu">
        <navigation-item class="profile-link__menu-item" v-model="navigationItems[0]"/>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {Icon} from "@iconify/vue";
import type {NavigationItem} from "~/common/types/common";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.ProfileLink"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const router = useRouter()

const navigationItems: NavigationItem[] = reactive(
    [
      {
        name: 'logout',
        title: 'Выйти',
        to: nuxtApp.$generateRoutePathDefault('Logout'),
        logo: 'fe:logout'
      }
    ]
)
</script>

<style lang="scss">
@import "./style.scss";
</style>