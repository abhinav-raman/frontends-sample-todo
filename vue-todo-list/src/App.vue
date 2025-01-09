<script setup lang="ts">
import { onUpdated, ref } from 'vue';
import Header from './components/Header.vue';
import type { TodoItemType } from './utils/types';
import CreateTodoCard from './components/CreateTodoCard.vue';
import TodoItemCard from './components/TodoItemCard.vue';

let todos = ref<Array<TodoItemType>>([])

// syncing todos from localStorage
const userLocalTasks = localStorage.getItem("todos");
if (userLocalTasks) {
  todos.value = JSON.parse(userLocalTasks) as TodoItemType[];
}

onUpdated(() => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
})

function handleCreateTodo(data: TodoItemType) {
  todos.value = [...todos.value, data];
}

function handleMarkTaskAsComplete(todoId: Pick<TodoItemType, "id">["id"]) {
  todos.value = todos.value.map((task) =>
    task.id === todoId
      ? {
        ...task,
        status: task.status === "completed" ? "not-completed" : "completed",
      }
      : task,
  );
}

function handleTodoDelete(todoId: Pick<TodoItemType, "id">["id"]) {
  todos.value = todos.value.filter((task) => task.id !== todoId);
}

</script>

<template>
  <main>
    <Header />
    <section class="flex gap-4 p-8">
      <CreateTodoCard :onSubmit="handleCreateTodo" />
      <TodoItemCard v-for="todoItem of todos" :todoItem="todoItem" :onMarkAsCompleteChange="handleMarkTaskAsComplete"
        :onDelete="handleTodoDelete" />
    </section>
  </main>

</template>