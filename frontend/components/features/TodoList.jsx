'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase'; // Ensure db is exported from your firebase config
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  doc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import TodoItem from './TodoItem';
import Input from '../ui/Input';
import Button from '../ui/Button';
import EditPopup from './EditPopup';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  // 1. Fetch Todos for the logged-in user
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Create a query to get only THIS user's tasks
    const q = query(collection(db, 'todos'), where('userId', '==', user.uid));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todoData);
    });

    return () => unsubscribe();
  }, []);

  // 2. Add Todo to Firestore
  const addTodo = async () => {
    if (newTodoTitle.trim() === '') return;
    const user = auth.currentUser;
    
    try {
      await addDoc(collection(db, 'todos'), {
        title: newTodoTitle,
        isChecked: false,
        userId: user?.uid,
        createdAt: new Date()
      });
      setNewTodoTitle('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // 3. Toggle Checkbox in Firestore
  const toggleTodo = async (id, currentStatus) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      isChecked: !currentStatus
    });
  };

  // 4. Delete from Firestore
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  // 5. Open Edit Popup
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
        <Input 
          placeholder="Enter your task here..." 
          className="input-todo-item" 
          onChange={changeInput} 
          value={newTodoTitle}
        />
        <Button color="blue" onClick={addTodo}>+</Button>
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available. Add a new task!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              isChecked={todo.isChecked}
              onToggle={() => toggleTodo(todo.id, todo.isChecked)}
              onEdit={() => editTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        )}
      </div>

      <EditPopup 
        isOpen={isPopUpOpen} 
        todo={todos.find(todo => todo.id === editingTodoId)}
        onSave={async (id, newTitle) => { 
          const todoRef = doc(db, 'todos', id);
          await updateDoc(todoRef, { title: newTitle });
          setIsPopUpOpen(false);
        }}
        onClose={() => {
          setIsPopUpOpen(false);
          setEditingTodoId(null);
        }}
      />
    </div>
  );
}