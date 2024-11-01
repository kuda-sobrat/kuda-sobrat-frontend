<template>
  <div class=navigation-bar-wrapper>
    <div class=navigation-bar>
      <div v-if="md || sm" class="navigation-bar__items">
        <navigation-item v-for="(navigationItem, index) in mobileNavigationItems" v-model="mobileNavigationItems[index]" class="navigation-bar__item"/>
      </div>
      <div v-else class="navigation-bar__items">
        <navigation-item v-for="(navigationItem, index) in mainNavigationItems" v-model="mainNavigationItems[index]" class="navigation-bar__item"/>
      </div>
    </div>
    <fridge v-model="fridgeState">
      [Дополнительное меню]
    </fridge>
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

const sm = ref(nuxtApp.$sm)
const md = ref(nuxtApp.$md)
const fridgeState = ref(false)

const mainNavigationItems: NavigationItem[] = reactive([
  {
    title: 'Профиль',
    name: 'profile',
    to: nuxtApp.$generateRoutePathDefault('Profile'),
    icon: '/icons/navigation/profile-1.svg'
  },
  {
    title: 'Мероприятия',
    name: 'events',
    to: nuxtApp.$generateRoutePathDefault('Events'),
    icon: '/icons/navigation/events-2.svg'
  },
  {
    title: 'Личный календарь',
    name: 'personal-calendar',
    to: nuxtApp.$generateRoutePathDefault('PersonalCalendar'),
    icon: '/icons/navigation/calendar-2.svg'
  },
  {
    title: 'Уведомления',
    name: 'notifications',
    to: nuxtApp.$generateRoutePathDefault('Notifications'),
    icon: '/icons/navigation/notifications-5.svg'
  },
  {
    title: 'Геолокация',
    name: 'geolocation',
    to: nuxtApp.$generateRoutePathDefault('Geolocation'),
    icon: '/icons/navigation/geolocation-1.svg'
  },
  {
    title: 'Настройки',
    name: 'settings',
    to: nuxtApp.$generateRoutePathDefault('Settings'),
    icon: '/icons/navigation/settings-1.svg'
  },
])

const mobileNavigationItems: NavigationItem[] = reactive([
  {
    title: 'Профиль',
    name: 'profile',
    to: nuxtApp.$generateRoutePathDefault('Profile'),
    logo: '',
    icon: '/icons/navigation/profile-1.svg'
  },
  {
    title: 'Личный календарь',
    name: 'personal_calendar',
    to: nuxtApp.$generateRoutePathDefault('PersonalCalendar'),
    logo: '',
    icon: '/icons/navigation/calendar-2.svg'
  },
  (md ? {
    title: 'Геолокация',
    name: 'geolocation',
    to: nuxtApp.$generateRoutePathDefault('Geolocation'),
    icon: '/icons/navigation/geolocation-1.svg'
  } : undefined),
  {
    title: 'Мероприятия',
    name: 'events',
    to: nuxtApp.$generateRoutePathDefault('Events'),
    logo: '',
    icon: '/icons/navigation/events-3.svg'
  },
  {
    title: 'Уведомления',
    name: 'notifications',
    to: nuxtApp.$generateRoutePathDefault('Notifications'),
    icon: '/icons/navigation/notifications-5.svg'
  },
  {
    title: 'Дополнительно меню',
    name: 'additional_menu',
    icon: '/icons/navigation/menu-2.svg',
    callback: openAdditionalMenu
  },
])

function openAdditionalMenu() {
  fridgeState.value = true
}

</script>

<style lang="scss">
@import "./style.scss";
</style>