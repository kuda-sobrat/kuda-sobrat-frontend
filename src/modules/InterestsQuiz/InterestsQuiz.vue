<template>
  <component :is="props.view === 'modal' ? Modal : 'div'" v-model="model">
    <div class="interests-quiz-module h-full contents">
      <progress-carousel v-model="active" type="scraper" class="max-sm:overflow-y-hidden">
        <template #default>
          <div class="contents">
            <div class="text-[24px] font-semibold md:mb-2 w-full sticky top-0 z-[1000] bg-white pb-2">
              Привет!
            </div>
            <question v-if="interests" :answers="ctx.questions[0].answers" v-model="ctx.questions[0].stateTmp" class="question__grid">
              <template #title>
                Отметь все чем горишь. Осторожно: пламя берется с искрой.
              </template>
              <template #description>
                Более детально увлечения можно настроить дальше
              </template>
              <template #answer="{item, index}">
                <div class="question-card">
                  {{ item.text }}
                </div>
              </template>
            </question>
          </div>
          <div class="block">
            <div class="contents" v-for="(item, key) in ctx.questions[1]" :key="key">
              <div class="text-[24px] font-semibold md:mb-2 w-full sticky top-0 z-[1000] bg-white pb-2">
                Выбери свои интересы:
              </div>
              <!--TODO: ctx.questions[1] может обновляться-->
              <question v-if="ctx.questions[1][key]" :answers="ctx.questions[1][key].answers" v-model="ctx.questions[1][key].stateTmp">
                <template #title>
                  Выбери подкатегории или пропусти этот шаг
                </template>
                <template #answer="{item, index}">
                  <div class="question-card">
                    {{ item.text }}
                  </div>
                </template>
              </question>
            </div>
          </div>
          <div class="contents">
            <div class="text-[24px] font-semibold md:mb-2 w-full sticky top-0 z-[1000] bg-white pb-2">
              Вот и все!
            </div>
            <div>
              Теперь мы знаем о твоих предпочтениях и подготовили для тебя самые интересные мероприятия. Приятного времени!
            </div>
          </div>
        </template>
        <template #footnote>
          <div class="flex flex-row flex-wrap gap-1">
            <v-button :state="ctx.questions[0].state.length > 0">
              Оставить
            </v-button>
            <v-button :state="ctx.questions[0].state.length > 0" @click="submitInterests(ctx.questions[0].state)">
              Продолжить
            </v-button>
          </div>
          <div v-for="(item, key) in ctx.questions[1]" class="flex flex-row flex-wrap gap-1" :key="key">
            <v-button @click="active--">
              Вернуться
            </v-button>
            <v-button @click="onQuestions1Continue(key)">
              Продолжить
            </v-button>
          </div>
          <div class="flex flex-row flex-wrap gap-1">
            <v-button @click="model = false; emit('ended')">
              Закончить
            </v-button>
          </div>
        </template>
      </progress-carousel>
    </div>
  </component>
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

const model = defineModel<boolean>({
  default: true
})

const props = defineProps<{
  view?: 'modal'
}>()

const emit = defineEmits<{
  ended: []
}>()

const interests = ref<CascadeItem[] | undefined>()

watch(() => ctx.value.questions[0].stateTmp, (value) => {
  ctx.value.questions[0].state = value.filter(item => item)
})

await (async (): Promise<void> => {
  interests.value = (await useStaticStore().get('interests'))!.value
  for (const index in interests.value) {
    ctx.value.questions[0].answers[index] = {
      text: interests.value[index].attributes.name,
      value: interests.value[index]
    }
  }
})()

function submitInterests(interests: CascadeItem[]) {
  console.log(interests)
  let childs: CascadeItem[] = []

  interests.forEach(item => {
    item.children.forEach(child => {
      childs.push(child)
    })
  })

  const batchSize = 8
// TODO: При сбросе повторном сбросе вопросов state не определяется
  ctx.value.questions[1] = []
  for (let i = 0; i < childs.length; i += batchSize) {
    const batch = childs.slice(i, i + batchSize)
    ctx.value.questions[1].push({
      state: [],
      answers: batch.map(item => {
        return {
          text: item.attributes.name,
          value: item
        }
      })
    })
  }

  active.value++
}

watch(model, () => {
  console.log(model.value)
  if (!model.value) {
    emit('ended')
  }
})

function submitQuestions1()
{
  let submitInterests: CascadeItem[] = []
  console.log(ctx.value.questions[1])
  for (const index in ctx.value.questions[1]) {
    ctx.value.questions[1][index].state = ctx.value.questions[1][index].stateTmp?.filter(item => item)
    ctx.value.questions[1][index].state?.map((item: CascadeItem) => {
      submitInterests.push(item)
    })
  }
  console.log(submitInterests)
}

function onQuestions1Continue(index: number)
{
  if (index + 1 >= ctx.value.questions[1].length) {
    active.value++
    submitQuestions1()
  } else {
    active.value++
  }
}

</script>

<style lang="scss">
@import "./style.scss";
</style>