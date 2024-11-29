<template>
  <suspense>
    <template #default>
      <nuxt-layout>
        <global-scenario-component/>
        <nuxt-page class="w-[100%]"/>
      </nuxt-layout>
    </template>
    <template #fallback>
      Загрузка...
    </template>
  </suspense>
<!--  <loading-bar/>-->
</template>

<script setup lang="ts">
import GlobalScenarioComponent from "~/src/components/GlobalScenarioComponent/GlobalScenarioComponent.vue";
</script>