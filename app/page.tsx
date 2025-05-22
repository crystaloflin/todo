"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { TodoItem } from "./components/todoitem";
import { supabase, Todo } from "./utils/supabase";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    supabase
      .from()
      .select()
      .then((res) => {
        if (!res.error) setTodos(res.data);
      });
  }, []);

  async function addTodo(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const { data: newTodo } = await supabase
      .from()
      .insert({ text: input.trim() });
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  }

  function toggleTodo(id: number) {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );
    setTodos(updated);
    supabase.from().update({ id, done: !todos.find((t) => t.id === id)?.done });
  }

  function deleteTodo(id: number) {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
    supabase.from().delete(id);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <form onSubmit={addTodo} className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="What do you need to do?"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>
        <ul className="mt-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleAction={toggleTodo}
              onDeleteAction={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
