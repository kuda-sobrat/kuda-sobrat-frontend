<template>
  <div class="test-page">
    <div class="page-content">
      1
      <modal v-model="modalState">
        <template #header>
          Header
          Header
          Header
          Header
          Header
        </template>
        HelloHelloHelloHello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
      </modal>
<!--      <cascade-list v-model="model" v-model:data="interests" :appearance-time="30"/>-->
    </div>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import {useStaticStore} from "~/stores/static.ts";

import CascadeList from "~/src/components/CascadeList/CascadeList.vue";
import Modal from "~/src/components/Modal/Modal.vue";

// i18
const i18nPrefix = "pages.Test"
const nuxtApp = useNuxtApp()

const staticStore = useStaticStore()
const interests = ref()
const model = ref([])
const modalState = ref(true)

defineI18nRoute({
  paths: {
    'en': '/test',
    'ru': '/test',
  }
})

definePageMeta({
  layout: 'simple'
})

onMounted(async () => {
  // interests.value = (await staticStore.get('interests')).value
})

</script>

<style>
@import "./style.scss";
</style>