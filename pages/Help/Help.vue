<template>
  <div class="help-page">
    <content-area>
      <div class="help-page__content">
        <h2>Привет!</h2>
        <p>Очень рад, что ты заглянул(а) сюда. Мне действительно важно знать, что есть люди, которым интересен этот проект и которые готовы поддержать его.</p>
        <br/>
        <h2>Как ты можешь помочь:</h2>
        <ol>
          <li>
            <strong class="relative">Поделись своими идеями
              <img
                  src="/common/идея.png"
                  alt="идея"
                  class="absolute bottom-0 left-[110%] h-[7ch] mb-1.5"
              />
            </strong>
            <p>Твои мысли и предложения бесценны. Если у тебя есть идеи по улучшению проекта, новые функции или просто пожелания, пожалуйста, поделись ими. Я открыт к любым предложениям и с благодарностью рассмотрю каждое из них.</p>
          </li>
          <li>
            <strong>Сообщи о проблемах</strong>
            <p class="relative">
<!--              <img src="/common/проблемы.png" alt="проблемы" class="h-[7ch] absolute right-[100%] -mt-4">-->
              Если ты заметил(а) какие-либо ошибки, неудобства или что-то, что можно улучшить, пожалуйста, дай мне знать. Твоя обратная связь поможет сделать проект лучше и удобнее для всех.
            </p>
          </li>
          <li class="relative">
            <img src="/common/делись.png" alt="делись" class="absolute left-[100%] ml-8 -mt-10"/>
            <strong>Делись</strong>
            <p>Если тебе нравится проект, расскажи о нём своим друзьям, поделись ссылкой в социальных сетях или на форумах. Твоя поддержка поможет привлечь новых людей.</p>
          </li>
          <li class="relative">
            <img src="/common/финансы.png" alt="делись" class="absolute right-[100%] mr-12 mt-12 h-[14ch]"/>
            <strong>Поддержи проект финансово</strong>
            <p>Твоя материальная поддержка поможет покрыть расходы на хостинг, разработку и внедрение новых функций. Даже небольшая сумма имеет значение и будет принята с огромной благодарностью.</p>
          </li>
          <li>
            <strong>Присоединяйся к работе над проектом</strong>
            <p>Если ты художник, дизайнер или опытный frontend-разработчик и хочешь внести свой вклад, я буду рад сотрудничеству. Твои навыки и идеи могут значительно обогатить проект.</p>
          </li>
        </ol>

        <h2>Связаться со мной можно так:</h2>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:maks1mkrasyuk@yandex.ru">maks1mkrasyuk@yandex.ru</a></li>
          <li><strong>Telegram:</strong> <a href="https://t.me/ya_solomka">@ya_solomka</a></li>
        </ul>

        <p>Спасибо, что уделил(а) время и проявил(а) интерес. Твоя поддержка действительно важна для меня, и вместе мы сможем сделать этот проект ещё лучше!</p>
<!--        <img src="/common/к нам.png" alt="к нам" class="absolute left-[100%] bottom-0 ml-8 h-[30ch]"/>-->
      </div>
    </content-area>
  </div>
</template>

<script setup="ts">
import {defineI18nRoute} from "#i18n";
import ContentArea from "~/src/components/ContentArea/ContentArea.vue";

// i18
const i18nPrefix = "pages.Help"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

defineI18nRoute({
  paths: {
    'en': '/help',
    'ru': '/help',
  }
})

</script>

<style>
@import "./style.scss";
</style>