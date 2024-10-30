<template>
  <div class="home-page">
    <div class="page-content container">
      <h1>
        Привет!
      </h1>
<!--      <div class="footer-links mb-4">
        <NuxtLink to="/" class="text-white hover:text-amber mx-4">Главная</NuxtLink>
        <NuxtLink to="/about" class="text-white hover:text-amber mx-4">О нас</NuxtLink>
        <NuxtLink to="/events" class="text-white hover:text-amber mx-4">Мероприятия</NuxtLink>
        <NuxtLink to="/organizers" class="text-white hover:text-amber mx-4">Организаторы</NuxtLink>
        <NuxtLink to="/contact" class="text-white hover:text-amber mx-4">Контакты</NuxtLink>
      </div>
      <div class="social-links mb-4">
        <a href="#" class="text-white hover:text-amber mx-2">Facebook</a>
        <a href="#" class="text-white hover:text-amber mx-2">Twitter</a>
        <a href="#" class="text-white hover:text-amber mx-2">Instagram</a>
      </div>
      <p class="text-sm">
        © 2024 Под авторством Максима Красюка
      </p>-->

<!--      <div class="header-logo text-primary text-2xl font-bold">
        Events Manager
      </div>
      <nav class="header-nav flex gap-5">
        <nuxt-link to="/" class="text-dark-gray hover:text-amber">
          Мероприятия
        </nuxt-link>
        <nuxt-link to="/organizers" class="text-dark-gray hover:text-amber">
          Организаторы
        </nuxt-link>
        <nuxt-link to="/about" class="text-dark-gray hover:text-amber">
          О нас
        </nuxt-link>
        <nuxt-link to="/contact" class="text-dark-gray hover:text-amber">
          Контакты
        </nuxt-link>
      </nav>
      <div class="header-search">
        <input
            type="text"
            class="p-2 border border-light-gray-secondary rounded"
            placeholder="Поиск мероприятий..."
        />
      </div>
      <button class="header-button bg-amber text-white py-2 px-4 rounded hover:bg-coral">
        Вход
      </button>-->
      <div>
        Какой-то текст
      </div>
    </div>
  </div>
</template>

<script setup="ts">
import { useNuxtApp } from '#app';
import {defineI18nRoute} from "#i18n";

// i18
const i18nPrefix = "pages.Home"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/',
    'ru': '/',
  }
})

</script>

<style lang="scss">
@import "./style.scss";
</style>