const n=`import { useActionState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoSchema } from "@/schemas";
import type { ITodo } from "@/types";
import { store, type RootState } from "@/stores/redux";
import { addTodo, removeTodo, toggleTodo } from "@/stores/redux/todos";
import CodeBlock from "@/components/code-block";

function Index() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const initialState: ITodo[] = [];
  const action = async (oldState: ITodo[], formData: FormData) => {
    const todo = Object.fromEntries(formData);
    const res = await todoSchema.safeParseAsync(todo);
    if (res.success) {
      const { content, done } = res.data;
      dispatch(addTodo(content, done));
      const newState = store.getState().todos;
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
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <input
              className="border"
              // type="radio"
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.content}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Delete
            </button>
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
          <p className="bg-green-200">@/stores/redux/index.ts</p>
          <CodeBlock
            dynamicRawImport={() => import("@/stores/redux/index.ts?raw")}
            showLineNo
            lang="typescript"
          />
        </div>
        <div>
          <p className="bg-green-200">@/stores/redux/todos/index.ts</p>
          <CodeBlock
            dynamicRawImport={() => import("@/stores/redux/todos/index.ts?raw")}
            showLineNo
            lang="typescript"
          />
        </div>
        <div>
          <p className="bg-green-200">@/pages/redux/index.tsx</p>
          <CodeBlock
            dynamicRawImport={() => import("@/pages/redux/index.tsx?raw")}
            showLineNo
            lang="tsx"
          />
        </div>
      </div>
    </>
  );
}

export default Index;
`;export{n as default};
