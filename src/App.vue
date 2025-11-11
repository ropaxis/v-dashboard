<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TasksList from './components/TasksList.vue'
import FilterButton from './components/FilterButton.vue'
import type { Task, TasksFilter } from './types'

const tasks = ref<Task[]>([])
const filter = ref<TasksFilter>('all')

onMounted(() => {
  const ls = localStorage.getItem('tasks')
  if (ls) {
    tasks.value = JSON.parse(localStorage.getItem('tasks')!)
  }
})

watch(tasks, () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}, { deep: true })

const doneTasks = computed(() => tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0))


function addTask(task: string) {
  tasks.value.push({
    id: crypto.randomUUID(),
    task: task,
    done: false,
  })
}

function toggleDone(id: string) {
  const task = tasks.value.find((task) => {
    return task.id === id
  })
  if (task) {
    task.done = !task.done
  }
}

function removeTask(id: string) {
  const index = tasks.value.findIndex((task) => task.id === id)
  if (index !== -1) {
    tasks.value.splice(index, 1)
  }
}

function setFilter(val: TasksFilter) {
  filter.value = val
}

const filterTask = computed(() => {
  switch (filter.value) {
    case 'all':
      return tasks.value
    case 'todo':
      return tasks.value.filter((task) => !task.done)
    case 'done':
      return tasks.value.filter((task) => task.done)
  }
  return tasks.value
})



</script>

<template>
  <main>
    <h1>My Tasks</h1>
    <TaskForm @add-task="addTask" />
    <h3 v-if="!tasks.length">Add the task to get started.</h3>
    <h3 v-else>Completed {{ doneTasks }} from {{ tasks.length }} tasks</h3>
    <div v-if="tasks.length" class="buttons-container">
      <FilterButton :currentFilter='filter' filter="all" @set-filter="setFilter" />
      <FilterButton :currentFilter='filter' filter="todo" @set-filter="setFilter" />
      <FilterButton :currentFilter='filter' filter="done" @set-filter="setFilter" />
    </div>
    <TasksList @toggle-done="toggleDone" @remove-task="removeTask" :tasks="filterTask" />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 1rem auto;
  padding: 0 1rem;
}

.buttons-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>
