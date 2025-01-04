<template>
  <div class="help-page">
    <content-area>
      <div class="help-page__content">
        <h2>Привет!</h2>
        <p>Очень рад, что ты заглянул(а) сюда. Мне действительно важно знать, что есть люди, которым интересен этот проект и которые готовы поддержать его.</p>
        <br/>
        <h2>Чем ты можешь помочь?</h2>
        <ol>
          <li>
            <strong class="relative">Поделись своими мыслями и идеями
              <img
                  src="/common/идея.png"
                  alt="идея"
                  class="absolute bottom-0 left-[110%] h-[7ch] mb-1.5"
              />
            </strong>
            <p>Твои идеи бесценны. Пожалуйста, расскажи о своих мыслях по улучшению проекта, новыми функциями или любыми пожеланиями. Я открыт к любым предложениям и с благодарностью рассмотрю каждое из них.</p>
          </li>
          <li>
            <strong>Сообщи о проблемах</strong>
            <p class="relative">
<!--              <img src="/common/проблемы.png" alt="проблемы" class="h-[7ch] absolute right-[100%] -mt-4">-->
              Если ты заметил ошибки, неудобства или что-то, что можно улучшить, пожалуйста, сообщи мне. Твоя обратная связь поможет сделать проект лучше и удобнее для всех.
            </p>
          </li>
          <li class="relative">
            <img src="/common/делись.png" alt="делись" class="absolute left-[100%] ml-8 -mt-10"/>
            <strong>Делись</strong>
            <p>Расскажи о проекте друзьям, поделись ссылкой в соцсетях или на форумах, если считаешь его полезным. Это поможет расширить сообщество.</p>
          </li>
          <li class="relative">
            <img src="/common/финансы.png" alt="делись" class="absolute right-[100%] mr-12 mt-12 h-[14ch]"/>
            <strong>Поддержи проект финансово</strong>
            <p>Твоя поддержка поможет покрыть затраты на хостинг, разработку и внедрение новых функций. Даже небольшое пожертвование имеет значение и будет принято с огромной благодарностью.</p>
          </li>
          <li>
            <strong>Присоединяйся к работе над проектом</strong>
            <p>
              Присоединяйся к работе, если тебе интересно дополнить проект своим творчеством или помочь с реализацией задуманного.
              Это очень ценно для меня сейчас, твои идеи и опыт могут придать проекту новое направление и глубину.
            </p>
          </li>
        </ol>

        <h2>Связаться со мной можно так:</h2>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:maks1mkrasyuk@yandex.ru" class="link">maks1mkrasyuk@yandex.ru</a></li>
          <li><strong>Telegram:</strong> <a href="https://t.me/ya_solomka" class="link">@ya_solomka</a></li>
        </ul>

        <p>Я очень благодарен тебе за внимание. Это вдохновляет и придаёт уверенности в развитии проекта.</p>
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