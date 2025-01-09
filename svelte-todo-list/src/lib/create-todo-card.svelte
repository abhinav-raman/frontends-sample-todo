<script lang="ts">
  import type { TodoItemType } from "../utils/types";

  type PropTypes = {
    onSubmit: (info: TodoItemType) => void;
  };
  const props: PropTypes = $props();

  function handleSubmit(
    e: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    },
  ) {
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
</script>

<div class="w-fit rounded-2xl bg-white p-4 shadow-2xl">
  <form onsubmit={handleSubmit}>
    <div class="mb-2 flex flex-col">
      <label for="title">Title:</label>
      <input
        class="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 text-sm font-light"
        required
        name="title"
        id="title"
      />
    </div>
    <div class="mb-2 flex flex-col">
      <label for="description">Description:</label>
      <input
        class="rounded border border-zinc-200 bg-zinc-100 px-2 py-1 text-sm font-light"
        required
        name="description"
        id="description"
      />
    </div>
    <button class="my-2 rounded-md bg-green-200 px-3 py-2" type="submit">
      Add todo
    </button>
  </form>
</div>
