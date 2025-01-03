<template>
  <div class=event-post-related>
    <div class="event-post-related__communities">
      <div class="event-post-related__title">
        Связанные сообщества
      </div>
      <div class="event-post-related__body">
<!--        <div>-->
<!--          [1]-->
<!--        </div>-->
<!--        <div>-->
<!--          [2]-->
<!--        </div>-->
<!--        <div>-->
<!--          [3]-->
<!--        </div>-->
      </div>
    </div>

    <div class="event-post-related__posts">
      <div class="event-post-related__title">
        Связанные записи
      </div>
      <div class="event-post-related__body">
<!--        <div>-->
<!--          [1]-->
<!--        </div>-->
<!--        <div>-->
<!--          [2]-->
<!--        </div>-->
<!--        <div>-->
<!--          [3]-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostRelated"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)
</script>

<style lang="scss">
@import "./style.scss";
</style>