"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import TodoList from "@/components/features/TodoList";
import SignoutModal from "@/components/modals/SignoutModal";
import UserModal from "@/components/modals/UserModal";
import ProgressBar from "@/components/features/ProgressBar";
import { subscribeToTodos } from "@/db/todo";
import { useTodoCelebration } from "@/hooks/useCelebration";
import Button from "@/components/ui/Button";
import { User2 } from "lucide-react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 1. Separate states for each modal to fix the double-popup bug
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);

  const [todos, setTodos] = useState<any[]>([]);

  // Redirect logic: If not loading and no user, send to auth page
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  // LIVE DATA FETCH (Real-time listener)
  useEffect(() => {
    let unsubscribe: () => void;

    if (user?.uid) {
      unsubscribe = subscribeToTodos(user.uid, (data) => {
        setTodos(data || []);
      });
    }

    // Cleanup: Stops listening when component unmounts or user logs out
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  // Confetti listener: Fires when all tasks in the 'todos' state are checked
  useTodoCelebration(todos);

  // Loading Screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading your tasks...
        </div>
      </div>
    );
  }

  // Prevent flicker before redirect
  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My To-Do List</h1>

          {/* Right-aligned group */}
          <div className="ml-auto flex items-center gap-6">
            <Button
              aria-label="User Settings"
              className="p-2 rounded-full hover:bg-gray- transition"
              color="gray"
              onClick={() => setIsUserModalOpen(true)}
            >
              <User2 className="h-5 w-5" />
            </Button>

            <h2
              className="text-red-600 hover:text-red-700 cursor-pointer font-medium focus:outline-none transition-colors"
              onClick={() => setIsSignoutModalOpen(true)}
            >
              Log Out
            </h2>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="space-y-6">
          <ProgressBar todos={todos} />
          <TodoList todos={todos} />
        </div>

        {/* MODALS SECTION */}
        <SignoutModal
          isOpen={isSignoutModalOpen}
          onClose={() => setIsSignoutModalOpen(false)}
        />

        <UserModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          currentUser={user}
        />
      </div>
    </main>
  );
}
