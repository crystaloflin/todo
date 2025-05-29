"use client";

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Todo, UUID } from "../utils/supabase"; // Adjust path as needed

type Props = {
  todo: Pick<Todo, "id" | "text" | "done">;
  onToggleAction: (id: UUID) => void;
  onDeleteAction: (id: UUID) => void;
};

export function TodoItem({ todo, onToggleAction, onDeleteAction }: Props) {
  return (
    <motion.li
      layout // optional: adds layout animations
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex text-zinc-200 items-center justify-between p-4 border-b border-zinc-800 hover:bg-zinc-800"
    >
      <span
        onClick={() => onToggleAction(todo.id)}
        className="cursor-pointer flex-1 flex items-center gap-2"
      >
        {todo.done && <span>✅</span>}
        <span className={todo.done ? "line-through text-zinc-600" : ""}>
          {todo.text}
        </span>
      </span>
      <button
        onClick={() => onDeleteAction(todo.id)}
        className="ml-4 text-red-500 hover:text-red-700"
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </motion.li>
  );
}
