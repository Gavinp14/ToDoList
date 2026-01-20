// src/components/TodoItem.js
'use client';

import { Trash2, Pencil } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function TodoItem({ title, isChecked, onToggle, onEdit, onDelete }) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Checkbox and Title */}
        <div className="flex items-center gap-3 flex-1">
          <input 
            type="checkbox" 
            checked={isChecked}
            onChange={onToggle}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <h3 className={`text-xl font-semibold text-gray-900 ${isChecked ? 'line-through text-gray-400' : ''}`}>
            {title}
          </h3>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2">
          <Button color="blue" onClick={onEdit}>
            <Pencil className="h-5 w-5" />
          </Button>
          <Button color="red" onClick={onDelete}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}