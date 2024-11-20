<template>
  <div class="v-input-wrapper">
    <label v-if="label" class="v-input-label">
      <span>{{ label }}</span>
    </label>
    <div class="relative flex">
      <input
          class="v-input"
          :class="{'v-input_error': isValid !== undefined && !isValid, 'v-input_checkbox': $attrs.type === 'checkbox'}"
          :style="{paddingLeft: $slots['inner-left'] ? '26px' : undefined, paddingRight: $slots['inner-right'] ? '34px' : undefined}"
          v-model="model"
          v-bind="$attrs"
          @change="isInit = true"
      >
      <div v-if="$attrs.type === 'checkbox'" class="v-input__checkmark">
        <slot name="checkbox"></slot>
        <component v-if="!$slots['checkbox']" :is="getIconComponent('/ui/success.svg')" alt="Чекбокс"/>
      </div>
      <span v-if="$slots['inner-left']" class="v-input__inner v-input__inner_left">
        <slot name="inner-left"/>
      </span>
      <span v-if="$slots['inner-right']" class="v-input__inner v-input__inner_right">
        <slot name="inner-right"/>
      </span>
    </div>
    <span v-if="isValid !== undefined && !isValid" class="v-input-label__error">
        * {{ props.validation![props.name!].$silentErrors[0].$message }}
      </span>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {Validation, ValidationArgs} from "@vuelidate/core";
import {getIconComponent} from "~/common/composables/useIcons";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.VInput"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel()
const isInit = ref(false)
const isValid = computed(() => {
  if (!isInit.value) {
    return props.name && props.validation ? true : undefined
  }
  return props.name && props.validation ? !(props.validation[props.name]?.$invalid) : undefined
})

defineExpose({
  isInit,
});

const registerChildRef = inject('registerChildRef', null)

// Отключаем наследование атрибутов на корневом элементе
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label?: string,
  validation?: Validation<ValidationArgs<unknown>, {}>
  name?: string,
}>()

onMounted(() => {
  if (registerChildRef) {
    registerChildRef({
      isInit,
      name: props.name
    });
  }
});

</script>

<style lang="scss">
@import "./style.scss";
</style>