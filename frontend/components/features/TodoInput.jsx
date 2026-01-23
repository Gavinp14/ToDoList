"use client";
import { useState } from "react";
import { addTodo } from "@/db/todo";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PriorityDropdown from "./PriorityDropdown";
import CategoryDropdown from "./CategoryDropdown";
import { Plus } from "lucide-react";

export default function TodoInput({ userId }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !newTodoTitle.trim()) return;

    await addTodo(userId, newTodoTitle, priority, category);
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
        <Plus className="h-6 w-6" />
      </Button>
      <CategoryDropdown
        className="mt-4"
        onCategoryChange={setCategory}
        selectedCategory={category}
      />
      <PriorityDropdown
        className="mt-4"
        onPriorityChange={setPriority}
        selectedPriority={priority}
      />
    </form>
  );
}
