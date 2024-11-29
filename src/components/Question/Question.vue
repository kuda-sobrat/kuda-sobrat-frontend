<template>
  <div class=question>
    <div class="sticky top-0 z-[1000] bg-white pb-2" :class="{'max-sm:drop-shadow': overflow}">
      <span class="question__title w-full">
      <slot name="title"/>
    </span>
      <span class="question__description">
      <slot name="description"/>
    </span>
    </div>
    <div :class="['question__answers', $attrs.class, overflow ? 'questions_overflow' : undefined]">
      <v-input v-for="(item, index) in answers" :key="index" class="question__answer" v-model="states[index]" type="checkbox-hidden">
        <template #default>
          <slot name="answer" :item="item" :index="index">
            {{ answers[index].text }}
          </slot>
        </template>
      </v-input>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import VInput from "~/src/components/VInput/VInput.vue";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.Question"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

export type Answer = {
  text: string
  value?: any
}

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<Answer[]>({
  default: []
})

const states = reactive([])
const overflow = ref(false)

watch(states, () => {
  model.value = states.map((item, index) => {
    return item ? props.answers[index].value ?? props.answers[index].text : undefined
  })
}, {immediate: true})

const props = defineProps<{
  answers: Answer[]
}>()

// const element = document.querySelector('.question__answers');

function updateOverflow(element: Element) {
  console.log(element?.classList)
  if (element?.scrollHeight > element?.clientHeight) {
    overflow.value = true
    // element!.classList.add('overflowing')
  } else {
    overflow.value = false
    // element!.classList.remove('overflowing')
  }
}

onMounted(() => {
  const element = document.querySelector('.question__answers');
  updateOverflow(element)
})
</script>

<style lang="scss">
@import "./style.scss";
</style>