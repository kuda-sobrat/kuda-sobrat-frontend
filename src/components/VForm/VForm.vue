<template>
  <form class=v-form @submit.prevent="onSubmit">
    <slot/>
  </form>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import useVuelidate from "@vuelidate/core";
import type {Ref} from "@vue/reactivity";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.VForm"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel<{[key: string]: any}>()
const data = defineModel<{[key: string]: any}>('data')
const rules = defineModel<{[key: string]: any}>('rules')
const childRefs = ref([]);

const v$ = useVuelidate(rules, data);
model.value = v$

const emit = defineEmits<{
  (e: 'submit', payload: SubmitEvent): void
}>();

function onSubmit(event: SubmitEvent) {
  v$.value.$touch()
  if (v$.value.$invalid) {
    console.log('Форма не прошла валидацию')
    for (const child of childRefs.value) {
      child.isInit = true
    }
  } else {
    emit('submit', event);
  }
}

// Функция для регистрации ref-ов, предоставленная дочерним компонентам
function registerChildRef(childRef: Ref<any>) {
  childRefs.value.push(childRef);
}

// Предоставляем функцию через provide
provide('registerChildRef', registerChildRef);

export type FormData = {
  v$?: {[key: string]: any},
  form: {[key: string]: any},
  rules?: {[key: string]: any}
}

</script>

<style lang="scss">
@import "./style.scss";
</style>