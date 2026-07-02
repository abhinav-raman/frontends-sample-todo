import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/header";
import CreateTodoItemCard from "../components/create-todo-card";
import type { TodoItemType } from "../utils/types";
import TodoItemCard from "../components/todo-card";

// The todo list lives in localStorage, which only exists in the browser, so
// this route opts out of server rendering entirely. This also prevents the
// create form from being visible (and natively submittable) before hydration.
export const Route = createFileRoute("/")({ component: Home, ssr: false });

function loadTodos(): Array<TodoItemType> {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored: unknown = JSON.parse(localStorage.getItem("todos") ?? "[]");
    return Array.isArray(stored) ? (stored as Array<TodoItemType>) : [];
  } catch {
    return [];
  }
}

function Home() {
  const [todos, setTodos] = useState<Array<TodoItemType>>(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleCreateTodo(data: TodoItemType) {
    setTodos((prev) => [...prev, data]);
  }

  function handleMarkTaskAsComplete(todoId: Pick<TodoItemType, "id">["id"]) {
    setTodos((prev) =>
      prev.map((task) =>
        task.id === todoId
          ? {
              ...task,
              status:
                task.status === "completed" ? "not-completed" : "completed",
            }
          : task,
      ),
    );
  }

  function handleTodoDelete(todoId: Pick<TodoItemType, "id">["id"]) {
    setTodos((prev) => prev.filter((task) => task.id !== todoId));
  }

  return (
    <main>
      <Header />
      <section className="flex gap-4 p-8">
        <CreateTodoItemCard onSubmit={handleCreateTodo} />
        {todos.map((todo) => (
          <TodoItemCard
            key={todo.id}
            todoItem={todo}
            onMarkAsCompleteChange={handleMarkTaskAsComplete}
            onDelete={handleTodoDelete}
          />
        ))}
      </section>
    </main>
  );
}
