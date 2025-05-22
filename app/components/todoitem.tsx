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
    <li className="flex items-center justify-between py-2 border-b border-gray-200 hover:bg-gray-50">
      <span
        onClick={() => onToggleAction(todo.id)}
        className={`cursor-pointer flex-1 ${
          todo.done ? "line-through text-gray-400" : ""
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
