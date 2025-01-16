<template>
  <div class="notification-bar__wrapper">
    <div class="notification-bar">
      <transition-group name="notification" tag="div">
        <notification
            v-for="(notification, index) in notificationStore.notifications"
            :key="index"
            :message="notification"
            @click="notificationStore.removeNotification(index)"
        />
      </transition-group>
    </div>
    <slot/>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import Notification from "~/src/components/Notification/Notification.vue";
import {useNotificationStore} from "~/stores/notifications";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.NotificationBar"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const notificationStore = toRef(useNotificationStore())

watch(() => notificationStore.value.appended, () => {
  setTimeout(() => {
    notificationStore.value.removeNotification(0)
  }, 3000)
})

onMounted(() => {
  notificationStore.value.addNotification('Скопировано в буфер обмена')
})
</script>

<style lang="scss">
@import "./style.scss";
</style>