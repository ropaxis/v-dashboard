<template>
    <form @submit.prevent="formSubmit">
        <label>
            New task
            <input @input="err = ''" v-model="task" name="task" :aria-invalid="!!err || undefined">
            <small v-if="err" id="invalid-helper">{{ err }}</small>
            <div class="button-container">
                <button>Add task</button>
            </div>
        </label>
    </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits<{
    addTask: [task: string]
}>()
const task = ref<string>('')
const err = ref<string>('')


function formSubmit() {
    if (task.value.trim()) {
        emit('addTask', task.value.trim())
        task.value = ''
    } else {
        err.value = 'Please enter a task'
    }
}
</script>

<style lang="scss" scoped>
.button-container {
    display: flex;
    justify-content: flex-end;
}
</style>