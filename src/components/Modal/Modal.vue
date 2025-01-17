<template>
  <div v-if="state" class=modal__wrapper>
    <div class="container">
      <div class="modal" :class="[`modal_${props.size}`]">
        <div class="modal__close_mobile-wrapper" @click="escState ? changeState() : undefined">
          <div class="modal__close modal__close_mobile" :class="{'modal__close_disabled': !escState}"/>
        </div>
        <component v-if="escState" class="modal__close" :is="getIconComponent('/ui/close.svg')" alt="Выход" @click="escState ? changeState() : undefined"/>
        <suspense>
          <template #default>
            <slot/>
          </template>
          <template #fallback>
            <div>
              Загрузка компонента...
            </div>
          </template>
        </suspense>
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
      escState?: boolean
    }>(),{
      size: 'limit',
      escState: true,
    }
)

const emit = defineEmits<{
  close: []
}>()

function changeState() {
  if (state.value) {
    state.value = !state.value
    emit('close')
  } else {
    state.value = !state.value
  }
}

</script>

<style lang="scss">
@import "./style.scss";
</style>