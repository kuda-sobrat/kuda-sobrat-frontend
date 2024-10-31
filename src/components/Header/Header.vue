<template>
  <div class="header">
    <div class="container">
      <div class="sections">
        <div class="section-a">
          <nuxt-link to="/" class="header__title">Куда, собрат?</nuxt-link>
        </div>
        <div class="section-main max-md:hidden">
          <search-bar class="flex-1"/>
        </div>
        <div class="section-c max-lg:hidden">
          <div class="flex flex-row justify-between w-full">
            <div></div>
            <div v-if="useAuthStore().token" class="flex flex-row gap-2 items-end justify-end mr-8">
              <profile-link/>
            </div>
            <nuxt-link to="/auth" v-else class="flex gap-1 items-center hover:transition-all hover:text-coral">
              <span class="text-[14px]">Войти</span>
              <img src="/icons/common/login-3.svg" class="cursor-pointer" alt="Выход"/>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import SearchBar from "~/src/components/SearchBar/SearchBar.vue";
import {useAuthStore} from "~/stores/auth";
// i18
const i18nPrefix = "components.Header"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const ctx = useDefaultState()

const router = useRouter()

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Animations
const beforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(-10px)'; // Начальная позиция для анимации
};

const enter = (el, done) => {
  el.offsetHeight; // триггер для перерисовки
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  el.style.opacity = 1;
  el.style.transform = 'translateY(0)'; // Конечная позиция для анимации
  done(); // Сообщить, что анимация завершена
};

const leave = (el, done) => {
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  el.style.opacity = 0;
  el.style.transform = 'translateY(-10px)'; // Позиция при закрытии
  done();
};
</script>

<style lang="scss">
@import "./style.scss";
</style>