'use client';
import { useState } from 'react';
import TodoItem from './TodoItem';
import Input from '../ui/Input';
import Button from '../ui/Button';
import EditPopup from './EditPopup';

export default function TodoList() {
    //dummy data
  const [todos, setTodos] = useState([
    { id: 1, title: 'Sample Task 1', isChecked: false },
    { id: 2, title: 'Sample Task 2', isChecked: true },
  ]);

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const addTodo = () => {
    const newTodo = { id: Date.now(), title: newTodoTitle, isChecked: false };

    // Prevent adding empty todos
    if (newTodoTitle.trim() === '') return;
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    setEditingTodoId(id);
    setIsPopUpOpen(true);
  };

  const changeInput = (e) => {
    setNewTodoTitle(e.target.value);
  }

  return (
    <div>
      <div className="flex gap-4 justify-center add-task-button mb-6">
        <Input placeholder="Enter your task here..." className="input-todo-item" onChange={changeInput}/>
        <Button color="blue" onClick={addTodo}>+</Button>
      </div>
      <div className="space-y-4">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isChecked={todo.isChecked}
            onToggle={() => toggleTodo(todo.id)}
            onEdit={() => editTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
      <EditPopup 
        isOpen={isPopUpOpen} 
        todo={todos.find(todo => todo.id === editingTodoId)}
        onSave={(id, newTitle) => { 
          setTodos(todos.map(todo => todo.id === id ? {...todo, title: newTitle} : todo));
          setIsPopUpOpen(false);
        }}
        onClose={() => setIsPopUpOpen(false)} 
      ></EditPopup>
    </div>
  );
}