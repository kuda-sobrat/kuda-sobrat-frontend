<template>
  <div v-show="item && item.state?.visible" class=cascade-list-item :class="{'cascade-list-item_closed': item!.children.length === 0}">
    <div v-if="item!.state" class="cursor-pointer flex flex-row gap-1">
      <v-input type="checkbox" v-model="item!.state!.selected" @change="onSelected">
        <template #checkbox>
          <component v-if="item?.children.length === 0 || item?.state.selectedFull" :is="getIconComponent('/ui/success.svg')" alt="Чекбокс"/>
          <component v-else :is="getIconComponent('/ui/minus.svg')" alt="Чекбокс"/>
        </template>
      </v-input>
      <span @click="onClick">
        {{ item?.attributes.name }}
      </span>
    </div>
    <div v-if="item!.children.length > 0" class="ml-5">
      <cascade-list-item v-for="(data, key) in item.children" v-model:item="item.children[key]" :level="level + 1" @selected="onChildSelected" @unselected="onChildUnselected"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDefaultState } from './composables/useDefault'
import type {CascadeItem, CascadeItemState} from "~/common/types/common";
import VInput from "~/src/components/VInput/VInput.vue";
import {getIconComponent} from "~/common/composables/useIcons";
import type {AsyncFunction} from "type-fest/source/async-return-type";
const ctx = useDefaultState()

// i18
const i18nPrefix = "components.CascadeListItem"
const nuxtApp = useNuxtApp()
const $i = nuxtApp.$i(i18nPrefix)

const setup = inject<Function>('setup', (item: {state: CascadeItemState}) => {
  item.state.visible = false
  item.state.childrenVisible = false
})
const push = inject<AsyncFunction>('push', async () => {console.log('Метод не определен')})
const pop = inject<AsyncFunction>('pop', async () => {console.log('Метод не определен')})
const appearanceTime = inject<number>('appearanceTime', 0)


const item = defineModel<CascadeItem&{state?: CascadeItemState}>('item')
const props = withDefaults(defineProps<{
  level?: number
}>(), {
  level: 0,
})
const emit = defineEmits<{
  selected: []
  unselected: []
}>()

function onClick() {
  item.value!.state!.childrenVisible = !(item.value!.state!.childrenVisible ?? false)
  if (item.value!.children.length === 0) {
    item.value!.state!.selected = !item.value!.state!.selected
    onSelected()
  }
}

async function onChildSelected() {
  item.value!.state!.selected = true
  item.value!.state!.selectedFull = true
  for(let child of item.value!.children) {
    if (!child.state?.selectedFull) {
      item.value!.state!.selectedFull = false
      break
    }
  }
  if (item.value!.state!.selectedFull) {
    push(item.value!)
  }
  emit('selected')
}

async function onChildUnselected() {
  item.value!.state!.selectedFull = false
  item.value!.state!.selected = false
  pop(item.value!)
  for(let child of item.value!.children) {
    if (child.state?.selectedFull || child.state?.selected) {
      item.value!.state!.selected = true
      break
    }
  }
  emit('unselected')
}

async function onSelected() {
  if (item.value!.state!.selected) {
    push(item.value)
    cascadeSelected(item.value!.children)
  } else {
    pop(item.value)
    cascadeUnselected(item.value!.children)
  }
  item.value!.state!.selectedFull = item.value!.state!.selected
  item.value!.state!.selected ? emit('selected') : emit('unselected')

}

async function cascadeUnselected(items: CascadeItem[])
{
  for (let i = 0; i < items.length; i++) {
    items[i].state!.selected = false
    items[i].state!.selectedFull = false
    if (items[i].children) {
      cascadeUnselected(items[i].children)
    }
    pop(items[i])
  }
}

async function cascadeSelected(items: CascadeItem[])
{
  for (let i = 0; i < items.length; i++) {
    items[i].state!.selected = true
    items[i].state!.selectedFull = true
    if (items[i].children) {
      cascadeSelected(items[i].children)
    }
    push(items[i])
  }
}

function cascadeOpen(items: CascadeItem[], params = {index: 1}) {
  for (let i = 0; i < items.length; i++) {
    if (!items[i].state!.visible) {
      setTimeout(() => {
        items[i].state!.visible = true
      }, params.index * appearanceTime)
      params.index++
    }
    if (items[i].state!.childrenVisible) {
      cascadeOpen(items[i].children, params)
    }
  }
}

function cascadeClose(items: CascadeItem[], params = {index: 1}) {
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].state!.childrenVisible) {
      cascadeClose(items[i].children, params)
    }
    if (items[i].state!.visible) {
      setTimeout(() => {
        items[i].state!.visible = false
      }, params.index * appearanceTime)
      params.index++
    }
  }
}

onMounted(() => {
  if (item.value) {
    item.value!.state = {}
    item.value!.state.level = props.level

    setup(item.value!)

    watch(() => item.value!.state!.childrenVisible, (value) => {
      if (value) {
        cascadeOpen(item.value!.children)
      } else {
        cascadeClose(item.value!.children)
      }
    })
  }
})
</script>

<style lang="scss">
@import "style";
</style>