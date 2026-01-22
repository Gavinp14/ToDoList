import React, { useState, useEffect } from 'react';
import PopUp from '../../ui/PopUp';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

export default function EditPopup({ isOpen, onClose, todo, onSave }) {
  const [tempTitle, setTempTitle] = useState(todo ? todo.title : '');

  // Update the input field whenever the 'todo' prop changes (when opening)
  useEffect(() => {
    if (todo) setTempTitle(todo.title);
  }, [todo]);

  const handleSave = () => {
    if (tempTitle.trim() === '') return;
    onSave(todo.id, tempTitle); // Send data back to parent
    console.log(todo.title);
  };

  return (
    <PopUp title="Edit Task" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input 
          value={tempTitle} 
          onChange={(e) => setTempTitle(e.target.value)}
          placeholder="Update task title..." 
        />
        
        <Button color="blue" onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </PopUp>
  );
}