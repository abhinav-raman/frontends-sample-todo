<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import type { TodoItemType } from '../utils/types';

const { todoItem, onDelete, onMarkAsCompleteChange } = defineProps<{
    todoItem: TodoItemType;
    onMarkAsCompleteChange: (id: TodoItemType['id']) => void;
    onDelete: (id: TodoItemType['id']) => void;
}>();

const isCompleted = computed(() => todoItem.status === 'completed');
</script>

<template>
    <div :class="twMerge(
        'relative flex w-fit min-w-60 flex-col rounded-2xl bg-white p-4 shadow-2xl transition-colors duration-200',
        isCompleted ? 'bg-green-100' : 'bg-red-100'
    )">
        <button aria-label="delete" @click="onDelete(todoItem.id)"
            class="absolute right-4 top-4 rounded-full p-2 text-red-600 hover:bg-red-600/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-trash-2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
        </button>
        <div>
            <h2 :class="twMerge('mb-2 text-2xl font-medium', isCompleted && 'line-through')">
                {{ todoItem.title }}
            </h2>
            <p :class="twMerge('font-light', isCompleted && 'line-through')">
                {{ todoItem.description }}
            </p>
        </div>
        <div class="mt-auto flex items-center justify-between">
            <label :for="'checkbox-' + todoItem.id">
                Mark as {{ todoItem.status === 'completed' ? 'incomplete' : 'complete' }}
            </label>
            <input class="h-6 w-6 rounded-lg accent-green-600" :id="'checkbox-' + todoItem.id" type="checkbox"
                :checked="todoItem.status === 'completed'" @change="onMarkAsCompleteChange(todoItem.id)" />
        </div>
    </div>
</template>