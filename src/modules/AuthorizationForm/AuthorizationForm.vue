<template>
  <div class=authorization-form-module>
    <block-scraper v-model="activeBlock">
      <authorization-form class="authorization-form-module__form">
        <v-button class="authorization-form-module__button" type="submit">
          Войти
        </v-button>
      </authorization-form>
      <registration-form class="authorization-form-module__form">
        <div class="authorization-form-module__buttons">
          <v-button class="max-w-[50px]" @click="activeBlock = 0">
            ➥
          </v-button>
          <v-button class="w-full" type="submit">
            Зерегистрироваться
          </v-button>
        </div>
      </registration-form>
    </block-scraper>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import AuthorizationForm from "~/src/components/AuthorizationForm/AuthorizationForm.vue";
import VButton from "~/src/components/VButton/VButton.vue";
import RegistrationForm from "~/src/components/RegistrationForm/RegistrationForm.vue";
import BlockScraper from "~/src/components/BlockScraper/BlockScraper.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "modules.AuthorizationForm"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)
const activeBlock = defineModel<number>('activeBlock', {
  default: 0
})
</script>

<style lang="scss">
@import "./style.scss";
</style>