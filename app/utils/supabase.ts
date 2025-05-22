export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "todos";

function getTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export const supabase = {
  from: () => ({
    select: async () => {
      const data = getTodos();
      return { data, error: null };
    },
    insert: async (newTodo: { text: string }) => {
      const todos = getTodos();
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.text,
        done: false,
      };
      const updated = [...todos, todo];
      saveTodos(updated);
      return { data: todo, error: null };
    },
    update: async (updatedFields: Partial<Todo>) => {
      const todos = getTodos();
      const updated = todos.map((todo) =>
        todo.id === updatedFields.id ? { ...todo, ...updatedFields } : todo,
      );
      saveTodos(updated);
      return { data: updatedFields, error: null };
    },
    delete: async (id: number) => {
      const todos = getTodos();
      const updated = todos.filter((todo) => todo.id !== id);
      saveTodos(updated);
      return { data: id, error: null };
    },
  }),
};
