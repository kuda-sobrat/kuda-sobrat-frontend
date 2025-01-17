<template>
  <div class=event-post-scenario>
    <modal v-model="isActive" @close="onClose">
      <event-post-modal v-model="activePost"/>
    </modal>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import EventPostModal from "~/src/components/EventPostModal/EventPostModal.vue";
import Modal from "~/src/components/Modal/Modal.vue";
import GetEvent from "~/common/api/endpoints/v1/event/GetEvent";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostScenario"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const route = useRoute()
const props = defineProps<{
  id: number
}>()

const activePost = ref()
const isActive = ref(false)

function onClose() {
  isActive.value = false
  const query = { ...route.query }
  delete query.event
  return navigateTo({path: route.path, query})
}

onMounted(async () => {
  isActive.value = true
  if (!route.query.event) {
    const query = { ...route.query }
    query.event = props.id
    return navigateTo({path: route.path, query})
  }
  activePost.value = await new GetEvent(props.id).call()
})
</script>

<style lang="scss">
@import "./style.scss";
</style>