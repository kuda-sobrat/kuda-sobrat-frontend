<template>
  <div class=global-scenario-component>
    <component :is="currentComponent" v-if="currentComponent"></component>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.GlobalScenarioComponent"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const route = useRoute();
const currentComponent = ref(null);

watch(
    () => route.fullPath,
    async () => {
      const scenario = route.query.scenario;

      if (scenario) {
        currentComponent.value = await getComponentForScenario(scenario);
      } else {
        currentComponent.value = null;
      }
    },
    { immediate: true }
);

// Функция для динамического импорта компонентов сценариев
async function getComponentForScenario(scenario: string) {
  try {
    switch (scenario) {
      case 'interests-quiz':
        return (await import('~/src/modules/GetInterestsScenario/GetInterestsScenario.vue')).default
      default:
        return null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке сценария:', error);
    return null;
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>