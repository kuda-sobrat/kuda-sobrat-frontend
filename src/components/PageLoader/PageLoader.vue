<template>
  <div class=page-loader__wrapper>
    <div class="page-loader">
      <span class="page-loader__caption">
        Куда, собрат?
      </span>
      <div class="spinner"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.PageLoader"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)
</script>

<style lang="scss">
@import "./style.scss";
</style>

<style>
.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #5F6EAE 94%,#0000) top/9px 9px no-repeat,
  conic-gradient(#0000 30%,#5F6EAE);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>