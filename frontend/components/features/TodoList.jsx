'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { doc, deleteDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { fetchUserTodos } from '@/db/users';
import TodoItem from './TodoItem';
import Input from '../ui/Input';
import Button from '../ui/Button';
import EditPopup from './EditPopup';

export default function TodoList() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    if (user) {
      loadTodos();
    }
  }, [user]);

  const loadTodos = async () => {
    const data = await fetchUserTodos(user.uid);
    setTodos(data);
  };

  //add to todo 
  const addTodo = async () => {
    if (!newTodoTitle.trim() || !user) return;
    await addDoc(collection(db, 'todos'), {
      title: newTodoTitle,
      isChecked: false,
      userId: user.uid,
      createdAt: new Date()
    });
    setNewTodoTitle('');
    loadTodos(); // Refresh list after adding
  };

  const toggleTodo = async (id, currentStatus) => {
    await updateDoc(doc(db, 'todos', id), { isChecked: !currentStatus });
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    loadTodos();
  };

  return (
    <div>
      <div className="flex gap-4 justify-center mb-6">
        <Input 
          placeholder="Enter your task here..." 
          onChange={(e) => setNewTodoTitle(e.target.value)} 
          value={newTodoTitle}
        />
        <Button color="blue" onClick={addTodo}>+</Button>
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available.</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              isChecked={todo.isChecked}
              onToggle={() => toggleTodo(todo.id, todo.isChecked)}
              onEdit={() => {
                setEditingTodoId(todo.id);
                setIsPopUpOpen(true);
              }}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        )}
      </div>

      <EditPopup 
        isOpen={isPopUpOpen} 
        todo={todos.find(t => t.id === editingTodoId)}
        onSave={async (id, newTitle) => { 
          await updateDoc(doc(db, 'todos', id), { title: newTitle });
          setIsPopUpOpen(false);
          loadTodos();
        }}
        onClose={() => setIsPopUpOpen(false)}
      />
    </div>
  );
}