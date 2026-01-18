import { todoSchema } from "@/schemas";
import type { ITodo } from "@/types";
import useTodoStore from "@/stores/zustand";
import { useActionState, useEffect } from "react";
import CodeBlock from "@/components/code-block";

function Index() {
  const { todos, addTodo, toggleTodo, removeTodo, getTodos } = useTodoStore();

  const doneTodosCnt = useTodoStore(
    (state) => state.todos.filter((todo) => todo.done).length,
  );
  const undoneTodosCnt = useTodoStore(
    (state) => state.todos.filter((todo) => !todo.done).length,
  );

  const initialState: ITodo[] = [];
  const action = async (oldState: ITodo[], formData: FormData) => {
    const todo = Object.fromEntries(formData);
    const res = await todoSchema.safeParseAsync(todo);
    if (res.success) {
      const { content, done } = res.data;
      addTodo(content, done);
      const newState = getTodos();
      console.log(oldState, "=>", newState);
      return newState;
    }
    throw res.error;
  };

  const [state, formAction /** isPending */] = useActionState(
    action,
    initialState,
  );

  useEffect(() => {
    console.log("useActionState", state);
  }, [state]);
  return (
    <>
      <div>Done todos count: {doneTodosCnt}</div>
      <div>Undone todos count: {undoneTodosCnt}</div>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <input
              className="border"
              // type="radio"
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.content}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="space-y-4">
        <form action={formAction} className="flex gap-2">
          <input type="text" name="content" className="border" />
          <input type="radio" name="done" />
          <button type="submit">Add todo</button>
        </form>
      </div>
      <div className="flex justify-between gap-12">
        <div>
          <p className="bg-green-200">@/stores/zustand/index.ts</p>
          <CodeBlock
            dynamicRawImport={() => import("@/stores/zustand/index.ts?raw")}
            showLineNo
            lang="typescript"
          />
        </div>
        <div>
          <p className="bg-green-200">@/pages/zustand/index.tsx</p>
          <CodeBlock
            dynamicRawImport={() => import("@/pages/zustand/index.tsx?raw")}
            showLineNo
            lang="tsx"
          />
        </div>
      </div>
    </>
  );
}

export default Index;
