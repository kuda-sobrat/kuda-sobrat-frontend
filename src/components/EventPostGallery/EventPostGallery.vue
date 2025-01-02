<template>
  <div class=event-post-gallery>
    [ EventPostGallery ]
    <Carousel id="gallery"
              class="carousel-gallery"
              :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide v-for="(image, index) in images" :key="index">
        <div class="carousel-gallery__item">
          <img :src="image.src"
               :alt="image.alt"/>
        </div>
      </Slide>
      <template #addons>
        <pagination/>
      </template>
    </Carousel>

<!--    <Carousel-->
<!--        id="thumbnails"-->
<!--        class="carousel-thumbnails"-->
<!--        :items-to-show="6"-->
<!--        :wrap-around="!(images.length < 6)"-->
<!--        v-model="currentSlide"-->
<!--        ref="carousel"-->
<!--    >-->
<!--      <Slide v-for="(image, index) in images" :key="index">-->
<!--        <div class="carousel-thumbnails__item" @click="slideTo(index)">-->
<!--          <img :src="image.src"-->
<!--               :alt="image.alt"-->
<!--          >-->
<!--        </div>-->
<!--      </Slide>-->
<!--    </Carousel>-->
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'

const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostGallery"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

// const props = defineProps<{
//   images: { src: string, alt?: string }[]
// }>()
const images = [
  {
    src: 'https://img.goodfon.com/original/2331x1750/1/c7/leopard-vzglyad-lezhit-leopard.jpg', alt: 'string'
  },
  {
    src: 'https://img.goodfon.com/original/2331x1750/1/c7/leopard-vzglyad-lezhit-leopard.jpg', alt: 'string'
  },
]

const currentSlide = ref(0)

</script>

<style lang="scss">
@import "./style.scss";
</style>