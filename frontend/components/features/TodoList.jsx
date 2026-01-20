'use client';
import { useState } from 'react';
import TodoItem from './TodoItem';
import Input from '../ui/Input';
import Button from '../ui/Button';
import EditPopup from './EditPopup';

export default function TodoList() {
    //dummy data
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  const addTodo = () => {
    if (newTodoTitle.trim() === '') return;
    const newTodo = { id: Date.now(), title: newTodoTitle, isChecked: false };
    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
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
        <Input placeholder="Enter your task here..." className="input-todo-item" onChange={changeInput} value={newTodoTitle}/>
        <Button color="blue" onClick={addTodo}>+</Button>
      </div>
      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available. Add a new task!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
            isChecked={todo.isChecked}
            onToggle={() => toggleTodo(todo.id)}
            onEdit={() => editTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))
        )}
      </div>

      <EditPopup 
        isOpen={isPopUpOpen} 
        todo={todos.find(todo => todo.id === editingTodoId)}
        onSave={(id, newTitle) => { 
          setTodos(todos.map(todo => todo.id === id ? {...todo, title: newTitle} : todo));
          setIsPopUpOpen(false);
        }}
        onClose={() => {
            setIsPopUpOpen(false);
            setEditingTodoId(null);
        }}
      ></EditPopup>
    </div>
  );
}