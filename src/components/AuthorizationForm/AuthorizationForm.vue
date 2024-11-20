<template>
  <v-form class=authorization-form-components v-model="v$" v-model:data="form" v-model:rules="rules" @submit="onSubmit">
    <div class="authorization-form-components__body">
      <v-input v-model="form.email" type="text" name="email" label="Почта / логин" placeholder="Ваша почта" :validation="v$"/>
      <v-input v-model="form.password" type="password" name="password" label="Пароль" placeholder="Пароль" :validation="v$"/>
    </div>
    <slot/>
  </v-form>
</template>

<script setup lang='ts'>

import { useDefaultState } from './composables/useDefault'
import VForm from "~/src/components/VForm/VForm.vue";
import VInput from "~/src/components/VInput/VInput.vue";
import {email, required} from "@vuelidate/validators";
import LoginEndpoint from "~/common/api/endpoints/v1/user/LoginEndpoint";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.AuthorizationForm"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const v$ = ref()

const form = reactive({
  email: undefined,
  password: undefined
})

const rules = {
  email: { required, email },
  password: { required },
}

function onSubmit() {
  new LoginEndpoint().call(form)
  console.log('Submit test', form)
}

</script>

<style lang="scss">
@import "./style.scss";
</style>