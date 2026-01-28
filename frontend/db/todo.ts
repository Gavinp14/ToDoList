import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs, // Added for the one-time fetch
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

/**
 * REAL-TIME LISTENER
 * Best for: Your main dashboard/list where you want instant updates.
 */
export const subscribeToTodos = (
  userId: string,
  callback: (todos: any[]) => void,
) => {
  const q = query(
    collection(db, "todos"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(todos);
  });
};

/**
 * ONE-TIME FETCH
 * Best for: Initial page loads or scenarios where you don't need a live stream.
 */
export const fetchUserTodos = async (uid: string) => {
  try {
    const todosRef = collection(db, "todos");
    const q = query(
      todosRef,
      where("userId", "==", uid),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

/**
 * ADD NEW TODO
 */
export const addTodo = async (
  userId: string,
  title: string,
  priority: string,
  category: string,
) => {
  if (!title.trim()) return;
  return await addDoc(collection(db, "todos"), {
    title,
    isChecked: false,
    category: category,
    priority: priority,
    userId,
    createdAt: new Date(),
  });
};

/**
 * TOGGLE STATUS (Checked / Unchecked)
 */
export const toggleTodoStatus = async (
  todoId: string,
  currentStatus: boolean,
) => {
  const todoRef = doc(db, "todos", todoId);
  return await updateDoc(todoRef, { isChecked: !currentStatus });
};

/**
 * UPDATE TITLE (Edit)
 */
export const updateTodoTitle = async (todoId: string, newTitle: string) => {
  const todoRef = doc(db, "todos", todoId);
  return await updateDoc(todoRef, { title: newTitle });
};

/**
 * DELETE TODO
 */
export const removeTodo = async (todoId: string) => {
  return await deleteDoc(doc(db, "todos", todoId));
};


//delete all todos for a user
export const deleteAllTodos = async (userId: string, todos: any[]) => {
  if (!userId || !todos.length) return;

  try {
    // 1. Find all docs in 'todos' collection belonging to this user
    const q = query(collection(db, "todos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    // 2. Delete each document refactor this in todos db file
    const deletePromises = querySnapshot.docs.map((todoDoc) =>
      deleteDoc(doc(db, "todos", todoDoc.id)),
    );

    await Promise.all(deletePromises);
    console.log("All tasks deleted successfully");
  } catch (error) {
    console.error("Error deleting tasks:", error);
  }
};
