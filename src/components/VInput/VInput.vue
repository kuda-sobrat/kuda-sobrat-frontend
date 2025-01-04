<template>
  <div class="v-input-wrapper" :class="props.class">
    <label v-if="label" class="v-input-label">
      <span>{{ label }}</span>
    </label>
    <div class="relative flex flex-1">
      <input
          class="v-input"
          :class="{'v-input_error': isValid !== undefined && !isValid, 'v-input_active': model, 'v-input_checkbox': props.type === 'checkbox' || props.type === 'checkbox-hidden', 'hidden': props.type === 'checkbox-hidden'}"
          :style="{paddingLeft: $slots['inner-left'] ? '26px' : undefined, paddingRight: $slots['inner-right'] ? '34px' : undefined}"
          v-model="model"
          v-bind="$attrs"
          @change="isInit = true"
          :type="props.type === 'checkbox-hidden' ? 'checkbox' : props.type"
      >

      <div v-if="props.type === 'checkbox'" class="v-input__checkmark relative">
        <slot name="checkbox"/>
        <component v-if="!$slots['checkbox']" :is="getIconComponent('/ui/success.svg')" alt="Чекбокс"/>
        <slot name="checkbox-addition"/>
      </div>
      <span v-if="$slots['inner-left']" class="v-input__inner v-input__inner_left">
        <slot name="inner-left"/>
      </span>
      <span v-if="$slots['inner-right']" class="v-input__inner v-input__inner_right">
        <slot name="inner-right"/>
      </span>
      <div v-if="$slots['default']" class="cursor-pointer flex-1" @click="model = !model">
        <slot/>
      </div>
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

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  label?: string,
  validation?: Validation<ValidationArgs<unknown>, {}>
  name?: string,
  type: 'checkbox'|'checkbox-hidden'|'text'|'password',
  class?: string,
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