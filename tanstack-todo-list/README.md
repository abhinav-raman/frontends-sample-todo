# TanStack Start Todo List

The same todo list app as the sibling `react-todo-list`, `vue-todo-list`, and
`svelte-todo-list` projects, built with [TanStack Start](https://tanstack.com/start)
(React 19, file-based routing, Tailwind CSS v4).

Features:

- Add a todo (title + description)
- Toggle complete / incomplete
- Delete a todo
- Persistence to `localStorage`

The `/` route is rendered client-only (`ssr: false`) because the todo list
lives in `localStorage`, which does not exist on the server.

## Getting started

```bash
npm install
npm run dev
```

The app runs on http://localhost:3000.

## Other scripts

```bash
npm run build    # production build (client + SSR server)
npm run preview  # preview the production build
npm run lint     # eslint
npm run check    # prettier check
```
