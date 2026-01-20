'use client';

import { Trash2, Pencil } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function TodoItem({ title, isChecked, onToggle, onEdit, onDelete }) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input 
            type="checkbox" 
            checked={isChecked}
            onChange={onToggle}
            className="h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <h3 
            className={`text-xl font-semibold text-gray-900 truncate ${isChecked ? 'line-through text-gray-400 opacity-60' : ''}`} 
            title={title}
          >
            {title}
          </h3>
        </div>
  
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button color="yellow" onClick={onEdit}>
            <Pencil className="h-5 w-5" />
          </Button>
          <Button aria-label="Delete Task" color="red" onClick={onDelete}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}