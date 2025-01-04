<template>
  <div class=end-of-events-feed>
    <img src="/common/Закат%20в%20горах.png" alt="Конец ленты мероприятий"/>
    <div class="leading-5 text-center">
      Конец ленты — начало новых открытий! Измени интересы или поделись <a class="link" href="https://forms.yandex.ru/u/676f072c84227c27e0ec1713/">ссылкой на сообщество</a>.
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.EndOfEventsFeed"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const messages = [
    'Конец ленты — начало новых открытий! Измените интересы или поделитесь ссылкой на своё сообщество.',
    'Упс, лента закончилась! Но вы можете найти больше — измените фильтры или поделитесь своим сообществом.',
    'Показали всё, что нашли. Попробуйте другие фильтры или предложите нам интересную группу!',
    'Это всё, что у нас есть сейчас. Настройте фильтры или пришлите нам ссылку на ваше любимое сообщество!'
]
</script>

<style lang="scss">
@import "./style.scss";
</style>