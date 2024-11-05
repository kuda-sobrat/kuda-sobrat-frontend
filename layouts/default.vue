<template>
  <div>
    <Header/>
    <div class="default-layout min-h-[100vh]">
      <div class="container">
        <div class="sections max-md:flex max-md:flex-col items-start justify-items-center">
          <navigation-bar/>
          <div class="section-main page-content">
            <slot/>
          </div>
          <div class="section-c max-lg:hidden">
            <div class="mt-3">
              [Фильтры и прочее]
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "~/src/components/Header/Header.vue";
</script>

<style lang="scss">

.max-md {
  div {
    @apply bg-red-500;
  }
}

section {
  @apply bg-red-200;
}

</style>