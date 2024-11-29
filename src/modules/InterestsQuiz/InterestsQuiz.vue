<template>
  <div class="interests-quiz-module h-full">
    <modal :model-value="true" esc-target="#hello" :esc-state="active!==0">
      <progress-carousel v-model="active" type="scraper" class="max-sm:overflow-y-hidden">
        <template #default>
          <div class="contents">
            <div class="text-[24px] font-semibold md:mb-2 w-full sticky top-0 z-[1000] bg-white pb-2">
              Привет!
            </div>
            <question v-if="interests" :answers="ctx.questions[0].answers" v-model="ctx.questions[0].state" class="question__grid">
              <template #title>
                Укажи свои интересы, проверь в списке:
              </template>
              <template #description>
                Отметь все чем горишь. Осторожно: с искры начинается пламя.
                <br/>
                Более детально увлечения можно настроить дальше
              </template>
              <template #answer="{item, index}">
                <div class="question-card">
                  {{ item.text }}
                </div>
              </template>
            </question>
          </div>
          <block2/>
          <block3/>
        </template>
        <template #footnote>
          <div class="flex flex-row flex-wrap gap-1">
            <v-button @click="active++; submitInterests(ctx.questions[0].state)">
              Далее
            </v-button>
            <v-button>
              Вернуться
            </v-button>
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <v-button @click="active++">
              Далее
            </v-button>
            <v-button @click="active--">
              Вернуться
            </v-button>
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <v-button>
              Далее
            </v-button>
            <v-button @click="active--">
              Вернуться
            </v-button>
          </div>
        </template>
      </progress-carousel>
    </modal>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import VButton from "~/src/components/VButton/VButton.vue";
import ProgressCarousel from "~/src/components/ProgressCarousel/ProgressCarousel.vue";

import Question from "~/src/components/Question/Question.vue";
import type {CascadeItem} from "~/common/types/common";
import {useStaticStore} from "~/stores/static";
import Modal from "~/src/components/Modal/Modal.vue";

const ctx = useDefaultState()

// i18
const i18nPrefix = "modules.InterestsQuiz"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const active = defineModel('active', {
  default: 0
})

const interests = ref<CascadeItem[] | undefined>()

const answers1 = ref<any>([])

await (async (): Promise<void> => {
  interests.value = (await useStaticStore().get('interests'))!.value
  for (const index in interests.value) {
    ctx.value.questions[0].answers[index] = {
      text: interests.value[index].attributes.name,
      value: interests.value[index]
    }
    // answers1.value.push()
  }
})()

function getAnswers() {
  return [
    {text: 'Ответ 1', value: '1'},
    {text: 'Ответ 2', value: '2'},
    {text: 'Ответ 3', value: '3'},
    {text: 'Ответ 4', value: '4'},
    // {text: 'Ответ 5', value: '5'},
    // {text: 'Ответ 6', value: '5'},
    // {text: 'Ответ 7', value: '5'},
    // {text: 'Ответ 8', value: '5'},
    // {text: 'Ответ 9', value: '5'},
    // {text: 'Ответ 10', value: '5'},
    // {text: 'Ответ 11', value: '5'},
    // {text: 'Ответ 12', value: '5'},
    // {text: 'Ответ 13', value: '5'},
  ]
}
</script>

<style lang="scss">
@import "./style.scss";
</style>