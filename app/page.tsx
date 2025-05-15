"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          value={input}
          onChange={handleInputChange}
          style={{ minWidth: "200px" }}
          placeholder="What do you need to do?"
        />
        <button type="submit" style={{ marginLeft: "1rem" }}>
          Add
        </button>
      </form>
      <ul style={{ marginTop: "1rem" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              cursor: "pointer",
              textDecoration: todo.done ? "line-through" : "none",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
