<template>
  <div class=event-post-gallery>
    <image-gallery v-if="images" :images="images"/>

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
import ImageGallery from "~/src/components/ImageGallery/ImageGallery.vue";
import type {EventPostAttachment} from "~/common/types/common";

const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EventPostGallery"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const props = defineProps<{
  data: EventPostAttachment[]
}>()

const images = computed(() => {
  return props.data.map((item) => {
    return {
      url: item.url,
      alt: item.title
    }
  })
})
// const images = [
//   {
//     src: 'https://img.goodfon.com/original/2331x1750/1/c7/leopard-vzglyad-lezhit-leopard.jpg', alt: 'string'
//   },
//   {
//     src: 'https://img.goodfon.com/original/2331x1750/1/c7/leopard-vzglyad-lezhit-leopard.jpg', alt: 'string'
//   },
// ]

const currentSlide = ref(0)

</script>

<style lang="scss">
@import "./style.scss";
</style>