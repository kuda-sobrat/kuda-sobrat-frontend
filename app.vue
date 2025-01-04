<template>
  <suspense>
    <template #default>
      <nuxt-layout>

        <global-scenario-component/>
        <nuxt-page class="w-[100%]"/>
      </nuxt-layout>
    </template>
    <template #fallback>
      <page-loader/>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import GlobalScenarioComponent from "~/src/components/GlobalScenarioComponent/GlobalScenarioComponent.vue";
import PageLoader from "~/src/components/PageLoader/PageLoader.vue";
</script>