"use client";

import { Trash2 } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Props = {
  todo: Todo;
  onToggleAction: (id: number) => void;
  onDeleteAction: (id: number) => void;
};

export function TodoItem({ todo, onToggleAction, onDeleteAction }: Props) {
  return (
    <li className="flex text-zinc-200 items-center justify-between p-4 border-b border-zinc-800 hover:bg-zinc-800">
      <span
        onClick={() => onToggleAction(todo.id)}
        className={`cursor-pointer flex-1 ${
          todo.done ? "line-through text-zinc-600" : ""
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDeleteAction(todo.id)}
        className="ml-4 text-red-500 hover:text-red-700"
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
