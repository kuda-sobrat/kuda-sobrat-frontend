<template>
  <div class=image-gallery__wrapper>
    <Carousel id="gallery"
              class="image-gallery h-full"
              :mouse-drag="true"
              :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide v-for="(image, index) in images" class="h-full" :key="index">
        <img class="image-gallery__item" :src="image.url" :alt="image.alt"/>
      </Slide>
      <template #addons>
        <pagination v-if="images?.length > 1"/>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.ImageGallery"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = defineProps<{
  images: {
    url: string,
    alt: string,
  }[]
}>()

const currentSlide = ref(0)

onMounted(() => {
})

</script>

<style lang="scss">
@import "./style.scss";
</style>