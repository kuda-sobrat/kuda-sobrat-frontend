<template>
  <div class=search-input__wrapper ref="wrapperRef">
    <v-input
        class="search-input"
        v-model="model"
        v-bind="$attrs"
        type="text"
        @input="onInput"
        @keyup.enter="onSearch"
        @focusout="suggestionsState = false"
        @focusin="suggestionsState = true"
    >
      <template #inner-left>
        <TestIcon class="w-6 h-6"/>
      </template>
    </v-input>
    <div v-if="suggestions.length > 0 && suggestionsState" class="search-input__suggestions">
      <div v-for="(suggestion, key) in suggestions" class="search-input__suggestion" :key="key" @click="onSearch(suggestion.name)">
        {{ suggestion.name }}
      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import TestIcon from 'assets/icons/test.svg'
import { useDefaultState } from './composables/useDefault'
import VInput from "~/src/components/VInput/VInput.vue";
import {debounce} from "~/common/composables/useHelpers";
import {useFeedStore} from "~/stores/feed";
import {toReactive} from "@vue/reactivity";
import GetSuggestionsEndpoint from "~/common/api/endpoints/v1/event/GetSuggestions";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.SearchInput"
const nuxtApp = useNuxtApp()
// const $i = nuxtApp.$i(i18nPrefix)

const model = defineModel()

const feedStore = toReactive(useFeedStore())

const suggestions = ref<any>([])
const suggestionsState = ref(false)

const debouncedSuggest = debounce(async (query: string) => {
  suggestionsState.value = true
  suggestions.value = await new GetSuggestionsEndpoint().call({query: query})
}, 250); // Задержка в миллисекундах

function onSearch(query?: string) {
  if (query) {
    model.value = query
  }

  feedStore.searchQuery = model.value ?? ''
  suggestionsState.value = false
}

function onInput() {
  if (model.value !== '') {
    debouncedSuggest(model.value)
  } else {
    suggestions.value = []
  }
}

// Ссылка на обертку компонента
const wrapperRef = ref(null)

// Функция для обработки кликов по документу
function onClickOutside(event: MouseEvent) {
  console.log('hello')
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    console.log('hello')
    suggestionsState.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside)
})

</script>

<style lang="scss">
@import "./style.scss";
</style>