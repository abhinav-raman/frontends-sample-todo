import { FormEvent } from "react";
import { TodoItemType } from "../utils/types";

type Proptypes = {
  onSubmit: (info: TodoItemType) => void;
};

export default function CreateTodoItemCard(props: Proptypes) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const todoInfo: TodoItemType = {
      id: Math.random().toString(),
      title: form.get("title")?.toString() || "",
      description: form.get("description")?.toString() || "",
      status: "not-completed",
    };
    props.onSubmit(todoInfo);
  }

  return (
    <div className="w-fit rounded-2xl bg-white p-4 shadow-2xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex flex-col">
          <label htmlFor="title">Title:</label>
          <input
            className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 text-sm font-light"
            required
            name="title"
            id="title"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="description">Description:</label>
          <input
            className="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 text-sm font-light"
            required
            name="description"
            id="description"
          />
        </div>
        <button
          className="my-2 rounded-md bg-green-200 px-3 py-2"
          type="submit"
        >
          Add todo
        </button>
      </form>
    </div>
  );
}
