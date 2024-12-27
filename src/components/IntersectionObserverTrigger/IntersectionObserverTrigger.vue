<template>
  <div ref="trigger" class=intersection-observer-trigger>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.IntersectionObserverTrigger"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const trigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
const emit = defineEmits<{
  trigger: [isIntersecting: boolean]
}>()

const options = {
  root: null, // Используем окно просмотра как область просмотра
  rootMargin: '0px',
  threshold: 0.1 // Компонент должен быть виден на 10% для срабатывания
};

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  // console.log('handleIntersect', entries[0].isIntersecting)
  emit('trigger', entries[0].isIntersecting)
  // entries.forEach((entry) => {
  //   if (entry.isIntersecting) {
  //     // Эмитируем событие 'load-more' в родительский компонент
  //     emit('load-more');
  //   }
  // });
};

onMounted(() => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(handleIntersect, options);
    if (trigger.value) {
      observer.observe(trigger.value);
    }
  } else {
    // Фолбэк для браузеров, не поддерживающих Intersection Observer
    // Можно использовать событие scroll
  }
});
</script>

<style lang="scss">
@import "./style.scss";
</style>