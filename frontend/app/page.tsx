"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import TodoList from "@/components/features/TodoList";
import SignoutModal from "@/components/modals/SignoutModal";
import ProgressBar from "@/components/features/ProgressBar";
// Ensure this import matches your new file name (todo.ts)
import { subscribeToTodos } from "@/db/todo";

export default function HomePage() {
  const { user, loading } = useAuth();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [todos, setTodos] = useState<any[]>([]);
  const router = useRouter();

  // Redirect logic
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  // LIVE DATA FETCH (Real-time)
  useEffect(() => {
    // Variable to hold the "stop" function
    let unsubscribe: () => void;

    if (user?.uid) {
      // Start the listener. It sends the array of todos to 'setTodos'
      // every time the database changes.
      unsubscribe = subscribeToTodos(user.uid, (data) => {
        setTodos(data || []);
      });
    }

    // Cleanup: This runs when the user logs out or leaves the page
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading your tasks...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My To-Do List</h1>
          <h2
            className="text-red-600 hover:text-red-700 cursor-pointer font-medium focus:outline-none"
            onClick={() => setIsPopUpOpen(true)}
          >
            Log Out
          </h2>
        </div>

        {/* Both of these now react instantly to database changes */}
        <ProgressBar todos={todos} />
        <TodoList todos={todos} />

        <SignoutModal
          isOpen={isPopUpOpen}
          onClose={() => setIsPopUpOpen(false)}
        />
      </div>
    </main>
  );
}
