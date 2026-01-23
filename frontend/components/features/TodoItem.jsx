"use client";

import { Trash2, Pencil } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function TodoItem({
  title,
  isChecked,
  onToggle,
  onEdit,
  onDelete,
  priority,
  category,
}) {
  // 1. Fixed: Added missing closing brace and default return
  //unit test needed here
  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onToggle}
            className="h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <h3
            className={`text-lg font-semibold text-gray-900 truncate ${
              isChecked ? "line-through text-gray-400 opacity-60" : ""
            }`}
            title={title}
          >
            {title}
          </h3>
          <h3 className="text-sm font-medium text-gray-500">{category}</h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* 2. Fixed: Added px, py, rounded, and border to make it a proper badge */}
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${getPriorityClasses(
              priority,
            )}`}
          >
            {priority || "Normal"}
          </span>

          <Button color="yellow" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button aria-label="Delete Task" color="red" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
