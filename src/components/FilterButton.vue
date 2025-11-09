<template>
    <button class="secondary" :class="{ contrast: props.filter === props.currentFilter }"
        @click="emit('setFilter', props.filter)">{{ props.filter }}</button>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import type { TasksFilter } from '../types'

const props = defineProps<{ filter: TasksFilter, currentFilter: TasksFilter }>()
const emit = defineEmits<{
    setFilter: [filter: TasksFilter],

}>()

</script>
<style scoped>
button {
    text-transform: capitalize;
}
</style>