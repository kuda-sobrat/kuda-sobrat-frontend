<template>
  <component v-if="currentComponent" class=global-scenario-component :is="currentComponent" v-bind="componentProps" @ended="onScenarioEnded()"/>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.GlobalScenarioComponent"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const route = useRoute();
const currentComponent = shallowRef(null);
const componentProps = shallowRef();

watch(
    () => route.fullPath,
    async () => {
      const scenario = route.query.scenario;

      if (scenario) {
        currentComponent.value = await getComponentForScenario(scenario);
      } else {
        currentComponent.value = null;
      }

      if (route.query.event) {
        componentProps.value = {
          id: Number(route.query.event)
        }
        currentComponent.value = (await import('~/src/components/EventPostScenario/EventPostScenario.vue')).default
      }
    },
    { immediate: true }
);

// Функция для динамического импорта компонентов сценариев
async function getComponentForScenario(scenario: string) {
  console.log('scenario', scenario)
  try {
    switch (scenario) {
      case 'interests-quiz':
        componentProps.value = {
          view: 'modal'
        }
        return (await import('~/src/modules/InterestsQuiz/InterestsQuiz.vue')).default
      default:
        return null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке сценария:', error);
    return null;
  }
}

function onScenarioEnded() {
  const query = { ...useRouter().currentRoute.value.query }
  delete query['scenario']
  useRouter().push({ query })
}
</script>

<style lang="scss">
@import "./style.scss";
</style>