<template>
  <nuxt-layout>
    <global-scenario-component/>
    <nuxt-page class="w-[100%]"/>
  </nuxt-layout>
  <loading-bar/>
</template>

<script setup lang="ts">
import LoadingBar from "~/src/components/LoadingBar/LoadingBar.vue";
import GlobalScenarioComponent from "~/src/components/GlobalScenarioComponent/GlobalScenarioComponent.vue";
</script>
