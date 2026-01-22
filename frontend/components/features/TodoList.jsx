"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  addTodo,
  toggleTodoStatus,
  removeTodo,
  updateTodoTitle,
} from "@/db/todo";
import TodoItem from "./TodoItem";
import Input from "../ui/Input";
import Button from "../ui/Button";
import EditPopup from "../modals/EditPopup";

export default function TodoList({ todos = [] }) {
  const { user } = useAuth();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleAdd = async () => {
    if (!user) return;
    await addTodo(user.uid, newTodoTitle);
    setNewTodoTitle("");
  };

  const handleToggle = async (id, status) => {
    await toggleTodoStatus(id, status);
  };

  const handleDelete = async (id) => {
    await removeTodo(id);
  };

  return (
    <div>
      <div className="flex gap-4 justify-center mb-6">
        <Input
          placeholder="Enter your task here..."
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
        />
        <Button color="blue" onClick={handleAdd}>
          {" "}
          +{" "}
        </Button>
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              isChecked={todo.isChecked}
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
