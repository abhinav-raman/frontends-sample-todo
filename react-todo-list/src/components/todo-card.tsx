import { twMerge } from "tailwind-merge";
import { TodoItemType } from "../utils/types";
import { useMemo } from "react";

type PropTypes = {
  todoItem: TodoItemType;
  onMarkAsCompleteChange: (value: Pick<TodoItemType, "id">["id"]) => void;
  onDelete: (value: Pick<TodoItemType, "id">["id"]) => void;
};

export default function TodoItemCard(props: PropTypes) {
  const { todoItem, onMarkAsCompleteChange, onDelete } = props;

  const isCompleted = useMemo(
    () => todoItem.status === "completed",
    [todoItem.status],
  );

  return (
    <div
      className={twMerge(
        "relative flex w-fit min-w-60 flex-col rounded-2xl bg-white p-4 shadow-2xl transition-colors duration-200",
        isCompleted ? "bg-green-100" : "bg-red-100",
      )}
    >
      <button
        onClick={() => onDelete(todoItem.id)}
        className="absolute right-4 top-4 rounded-full p-2 text-red-600 hover:bg-red-600/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash-2"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>
      <div>
        <h2
          className={twMerge(
            "mb-2 text-2xl font-medium",
            isCompleted && "line-through",
          )}
        >
          {todoItem.title}
        </h2>
        <p className={twMerge("font-light", isCompleted && "line-through")}>
          {todoItem.description}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <label htmlFor={"checkbox-" + todoItem.id}>
          Mark as {todoItem.status === "completed" ? "incomplete" : "complete"}
        </label>
        <input
          className="h-6 w-6 rounded-lg accent-green-600"
          id={"checkbox-" + todoItem.id}
          type="checkbox"
          checked={todoItem.status === "completed"}
          onChange={() => onMarkAsCompleteChange(todoItem.id)}
        />
      </div>
    </div>
  );
}
