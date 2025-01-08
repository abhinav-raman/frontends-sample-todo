import { useEffect, useState } from "react";
import Header from "./components/header";
import CreateTodoItemCard from "./components/create-todo-card";
import { TodoItemType } from "./utils/types";
import TodoItemCard from "./components/todo-card";

function App() {
  const [todos, setTodos] = useState<Array<TodoItemType>>([]);

  useEffect(() => {
    const userLocalTasks = localStorage.getItem("todos");
    if (userLocalTasks) {
      setTodos(JSON.parse(userLocalTasks) as TodoItemType[]);
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
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

export default App;
