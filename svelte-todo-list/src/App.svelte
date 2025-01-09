<script lang="ts">
  import CreateTodoCard from "./lib/create-todo-card.svelte";
  import Header from "./lib/header.svelte";
  import TodoItemCard from "./lib/todo-item-card.svelte";
  import type { TodoItemType } from "./utils/types";

  let todos: Array<TodoItemType> = $state([]);

  // syncing todos from localStorage
  const userLocalTasks = localStorage.getItem("todos");
  if (userLocalTasks) {
    todos = JSON.parse(userLocalTasks) as TodoItemType[];
  }

  $effect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  function handleCreateTodo(data: TodoItemType) {
    todos = [...todos, data];
  }

  function handleMarkTaskAsComplete(todoId: Pick<TodoItemType, "id">["id"]) {
    todos = todos.map((task) =>
      task.id === todoId
        ? {
            ...task,
            status: task.status === "completed" ? "not-completed" : "completed",
          }
        : task,
    );
  }

  function handleTodoDelete(todoId: Pick<TodoItemType, "id">["id"]) {
    todos = todos.filter((task) => task.id !== todoId);
  }
</script>

<main>
  <Header />
  <section class="flex gap-4 p-8">
    <CreateTodoCard onSubmit={handleCreateTodo} />
    {#each todos as todo}
      <TodoItemCard
        todoItem={todo}
        onMarkAsCompleteChange={handleMarkTaskAsComplete}
        onDelete={handleTodoDelete}
      />
    {/each}
  </section>
</main>
