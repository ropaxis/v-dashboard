<template>
    <TransitionGroup name="list" tag="ul" class="task-list">
        <li v-for="task in props.tasks" :key="task.id">
            <article class="task">
                <label>
                    <input @input="() => emit('toggleDone', task.id)" type="checkbox" :checked="task.done">
                    <span :class="{ done: task.done }">
                        {{ task.task }}
                    </span>
                </label>
                <button class="outline" @click="() => emit('removeTask', task.id)">Delete task</button>
            </article>
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Task } from '../types'
const props = defineProps<{
    tasks: Task[]
}>()
const emit = defineEmits<{
    toggleDone: [id: string]
    removeTask: [id: string]
}>()
</script>

<style lang="scss" scoped>
.task-list {
    margin-top: 1rem;

    padding: 0;

    & li {
        list-style: none;
    }

    .task {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .done {
        text-decoration: line-through;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(300px);
    }
}
</style>