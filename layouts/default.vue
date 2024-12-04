<template>
  <div class="relative">
    <Header/>
    <div class="default-layout min-h-[100vh] w-[100%]">
      <div class="container">
        <div class="flex md:flex-row items-start justify-items-center">
          <navigation-bar class="max-lg:min-w-[33vw] lg:min-w-[300px]"></navigation-bar>
          <main class="main-content w-full">
            <slot/>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "~/src/components/Header/Header.vue";
import NavigationBar from "~/src/components/NavigationBar/NavigationBar.vue";
</script>