<template>
  <div class="authorization-page">
    <div class="page-content container">
      <div class="authorization-page__form">
        <div v-if="activeBlock === 0" class="authorization-page__title">Куда, собрат?</div>
        <authorization-form v-model:active-block="activeBlock"/>
      </div>
      <div v-if="activeBlock !== 1" class="authorization-page__prepended">
        <span>
          Нет аккаунта? -
          <span class="action-link" @click="activeBlock = 1">
            зарегистрируйся
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import AuthorizationForm from "~/src/modules/AuthorizationForm/AuthorizationForm.vue";

// i18
const i18nPrefix = "pages.Authorization"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const activeBlock = ref(0)

defineI18nRoute({
  paths: {
    'en': '/auth',
    'ru': '/auth',
  }
})

definePageMeta({
  layout: 'simple'
})

</script>

<style>
@import "./style.scss";
</style>