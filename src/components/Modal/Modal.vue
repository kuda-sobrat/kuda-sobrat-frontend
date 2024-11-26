<template>
  <div v-if="state" class=modal__wrapper>
    <div class="container">
      <div class="modal" :class="[`modal_${props.size}`]">
        <div class="modal__header">
          <component class="modal__close" :is="getIconComponent('/ui/close.svg')" alt="Выход" @click="state = !state"/>
          <div class="modal__headnote">
            <slot name="headnote"/>
          </div>
        </div>
        <div class="modal__content">
          <slot/>
        </div>
        <div class="modal__footnote">
          <slot name="footnote"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import {getIconComponent} from "~/common/composables/useIcons";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.Modal"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

type ModalSize = 'sm' | 'md' | 'lg' | 'limit'

const state = defineModel()

const props = withDefaults(
    defineProps<{
      size?: ModalSize
    }>(),{
      size: 'limit',
    }
)
</script>

<style lang="scss">
@import "./style.scss";
</style>