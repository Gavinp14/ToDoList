"use client";
import { useState } from "react";
import { addTodo } from "@/db/todo";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function TodoInput({ userId }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !newTodoTitle.trim()) return;

    await addTodo(userId, newTodoTitle);
    setNewTodoTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 justify-center mb-6">
      <Input
        placeholder="Enter your task here..."
        onChange={(e) => setNewTodoTitle(e.target.value)}
        value={newTodoTitle}
      />
      <Button type="submit" color="blue">
        +
      </Button>
    </form>
  );
}
