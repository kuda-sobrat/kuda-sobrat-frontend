<template>
  <div class=navigation-bar-wrapper>
    <client-only>
      <div class=navigation-bar>
        <div v-if="md || sm" class="navigation-bar__items">
          <navigation-item v-for="(_, index) in mobileNavigationItems" v-model="mobileNavigationItems[index]" :key="index" class="navigation-bar__item"/>
        </div>
        <div v-else class="navigation-bar__items">
          <navigation-item v-for="(_, index) in mainNavigationItems" v-model="mainNavigationItems[index]" :key="index" class="navigation-bar__item"/>
        </div>
        <nuxt-link v-if="md || sm" class="absolute bottom-[100%]" to="/help">
          <div class="navigation-bar__help">
            <img class="max-h-[12px] inline mr-1" src="/common/помощь.png" alt="помощь"/>
            <span>поддержать</span>
          </div>
        </nuxt-link>
      </div>
      <nuxt-link to="/help">
        <div v-if="!(md || sm)" class="navigation-bar__help">
          <img class="max-h-[12px] inline mr-1" src="/common/помощь.png" alt="помощь"/>
          <span>поддержать</span>
        </div>
      </nuxt-link>
      <fridge v-model="fridgeState">
        Здесь будет размещена навигация. А пока можешь
        <nuxt-link to="/help" class="link">
          поддержать
        </nuxt-link>
        проект.
        Спасибо за интерес!
      </fridge>
    </client-only>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import NavigationItem from "~/src/components/NavigationItem/NavigationItem.vue";
import type {NavigationItem as NavigationItemType} from "~/common/types/common";
import Fridge from "~/src/components/Fridge/Fridge.vue";
import {onMounted} from "~/.nuxt/imports";
import type {Ref} from "@vue/reactivity";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.NavigationBar"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const sm = ref(nuxtApp.$sm)
const md = ref(nuxtApp.$md)
const fridgeState = ref(false)

const mainNavigationItems: Ref<(NavigationItemType|undefined)[]|undefined> = ref()

const mobileNavigationItems: Ref<(NavigationItemType|undefined)[]|undefined> = ref()

onMounted(() => {
  mainNavigationItems.value = [
    {
      title: 'Профиль',
      name: 'profile',
      to: nuxtApp.$generateRoutePathDefault('Profile'),
      icon: '/navigation/profile-1.svg',
      isBlocked: true,
    },
    {
      title: 'Мероприятия',
      name: 'events',
      to: nuxtApp.$generateRoutePathDefault('Home'),
      icon: '/navigation/events-2.svg',
      // image: '/common/Мероприятия.png'
    },
    {
      title: 'Личный календарь',
      name: 'personal-calendar',
      to: nuxtApp.$generateRoutePathDefault('PersonalCalendar'),
      icon: '/navigation/calendar-2.svg',
      isBlocked: true,
    },
    {
      title: 'Уведомления',
      name: 'notifications',
      to: nuxtApp.$generateRoutePathDefault('Notifications'),
      icon: '/navigation/notifications-5.svg',
      isBlocked: true,
    },
    {
      title: 'Геолокация',
      name: 'geolocation',
      to: nuxtApp.$generateRoutePathDefault('Geolocation'),
      icon: '/navigation/geolocation-1.svg',
      isBlocked: true,
    },
    {
      title: 'Настройки',
      name: 'settings',
      to: nuxtApp.$generateRoutePathDefault('Settings'),
      icon: '/navigation/settings-1.svg',
      isBlocked: true,
    },
  ]

  mobileNavigationItems.value = [
    {
      title: 'Профиль',
      name: 'profile',
      to: nuxtApp.$generateRoutePathDefault('Profile'),
      icon: '/navigation/profile-1.svg',
      isBlocked: true,
    },
    {
      title: 'Личный календарь',
      name: 'personal_calendar',
      to: nuxtApp.$generateRoutePathDefault('PersonalCalendar'),
      icon: '/navigation/calendar-2.svg',
      isBlocked: true,
    },
    (md ? {
      title: 'Геолокация',
      name: 'geolocation',
      to: nuxtApp.$generateRoutePathDefault('Geolocation'),
      icon: '/navigation/geolocation-1.svg',
      isBlocked: true,
    } : undefined),
    {
      title: 'Мероприятия',
      name: 'events',
      to: nuxtApp.$generateRoutePathDefault('Home'),
      // icon: '/navigation/events-3.svg'
      image: '/common/Мероприятия.png'
    },
    {
      title: 'Уведомления',
      name: 'notifications',
      to: nuxtApp.$generateRoutePathDefault('Notifications'),
      icon: '/navigation/notifications-5.svg',
      isBlocked: true,
    },
    {
      title: 'Дополнительно меню',
      name: 'additional_menu',
      icon: '/navigation/menu-2.svg',
      callback: openAdditionalMenu,
    },
  ]
})

function openAdditionalMenu() {
  fridgeState.value = true
}

</script>

<style lang="scss">
@import "./style.scss";
</style>