<template>
  <v-form class=registration-form v-model="formData.v$" v-model:data="formData.form" v-model:rules="formData.rules" @submit="onSubmit">
    <div class="authorization-form-components__title">Регистрация</div>
    <div class="registration-form__body">
      <v-input v-model="formData.form.name" type="text" name="name" label="Имя пользователя" placeholder="Любое удобное имя" :validation="formData.v$"/>
      <v-input v-model="formData.form.email" type="text" name="email" label="Почта / логин" placeholder="Ваша почта" :validation="formData.v$"/>
      <v-input v-model="formData.form.password" type="password" name="password" label="Пароль" placeholder="Пароль" :validation="formData.v$"/>
      <v-input v-model="formData.form.password_confirmation" type="password" name="confirmPassword" label="Подтвердите пароль" placeholder="Подтвердите пароль" :validation="formData.v$"/>
    </div>
    <slot/>
  </v-form>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import VForm from "~/src/components/VForm/VForm.vue";
import { type FormData } from "~/src/components/VForm/VForm.vue";
import VInput from "~/src/components/VInput/VInput.vue";
import {email, required} from "@vuelidate/validators";
import RegistrationEndpoint from "~/common/api/endpoints/v1/user/RegistrationEndpoint";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.RegistrationForm"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const formData = reactive<FormData>({
  v$: {},
  form: {},
  rules: {
    name: { required },
    email: { required, email },
    password: { required },
    password_confirmation: { required }
  },
})

function onSubmit() {
  new RegistrationEndpoint().call(formData.form)
  console.log('Успешно')
}

</script>

<style lang="scss">
@import "./style.scss";
</style>