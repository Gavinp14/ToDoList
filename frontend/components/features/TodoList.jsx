"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toggleTodoStatus, removeTodo, updateTodoTitle } from "@/db/todo";
import TodoItem from "./TodoItem";
import EditPopup from "../modals/EditPopup";

export default function TodoList({ todos = [] }) {
  const { user } = useAuth();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleToggle = async (id, status) => {
    await toggleTodoStatus(id, status);
  };

  const handleDelete = async (id) => {
    await removeTodo(id);
  };

  return (
    <div className="w-full">
      {/* SCROLL CONTAINER 
          max-h-[420px] is roughly 5-6 items depending on your TodoItem padding.
          overflow-y-auto ensures the scrollbar stays hidden until content overflows.
      */}
      <div className="max-h-[500px] overflow-x-hidden hover:overflow pr-2 custom-scrollbar">
        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No tasks available.
            </p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                isChecked={todo.isChecked}
                priority={todo.priority}
                category={todo.category}
                onToggle={() => handleToggle(todo.id, todo.isChecked)}
                onEdit={() => {
                  setEditingTodoId(todo.id);
                  setIsPopUpOpen(true);
                }}
                onDelete={() => handleDelete(todo.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      <EditPopup
        isOpen={isPopUpOpen}
        todo={todos.find((t) => t.id === editingTodoId)}
        onSave={async (id, newTitle) => {
          await updateTodoTitle(id, newTitle);
          setIsPopUpOpen(false);
        }}
        onClose={() => setIsPopUpOpen(false)}
      />
    </div>
  );
}
