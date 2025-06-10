"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { supabase, Todo, UUID } from "./utils/supabase";
import { TodoItem } from "./components/todoitem";
import { AuthForm } from "./components/auth";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchTodos();
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
        fetchTodos();
      }
    });
  }, []);

  // fetch todos
  async function fetchTodos() {
    const { data, error } = await supabase
      .from<"todos", Todo>("todos")
      .select("*")
      .order("inserted_at", { ascending: true });
    if (!error) setTodos(data);
  }

  async function addTodo(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const { data, error } = await supabase
      .from("todos") // ✅ No type arguments here
      .insert([{ text: input.trim(), user_id: user.id }])
      .select()
      .single();

    if (!error && data) {
      setTodos((prev) => [...prev, data as Todo]);
      setInput("");
    }
  }

  async function toggleTodo(id: UUID, done: boolean) {
    const { error } = await supabase
      .from("todos") // ✅ no type arguments
      .update({ done: !done })
      .eq("id", id);

    if (!error) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !done } : t)),
      );
    }
  }

  async function deleteTodo(id: UUID) {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
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
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleAction={() => toggleTodo(todo.id, todo.done)}
              onDeleteAction={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
