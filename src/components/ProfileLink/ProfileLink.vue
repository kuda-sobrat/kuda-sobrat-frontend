<template>
  <div class=profile-link :class="{'profile-link_active': state}" @click="state = !state" v-click-outside="() => {state = false}">
    <div class="h-[36px] flex items-center justify-center relative">
      <img src="/common/Заблокировано.png" alt="Заблокировано" class="ml-0.5">
    </div>
<!--    <component :is="getIconComponent('/navigation/more.svg')" alt="Еще"/>-->
<!--    <div class="profile-link__menu-wrapper">-->
<!--      <div class="profile-link__menu">-->
<!--                  <navigation-item class="profile-link__menu-item" v-model="navigationItems[0]"/>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {NavigationItem as NavigationItemType} from "~/common/types/common";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.ProfileLink"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const state = defineModel<boolean>('state', {
  default: false
})
const router = useRouter()

const navigationItems: NavigationItemType[] = reactive(
    [
      {
        name: 'logout',
        title: 'Выйти',
        to: nuxtApp.$generateRoutePathDefault('Logout'),
        icon: '/navigation/logout.svg'
      }
    ]
)
</script>

<style lang="scss">
@import "./style.scss";
</style>