"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TodoList from "@/components/features/TodoList";
import SignoutModal from "@/components/modals/SignoutModal";

export default function HomePage() {
  const { user, loading, signOutUser } = useAuth();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

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

        <TodoList />
        <SignoutModal
          isOpen={isPopUpOpen}
          onClose={() => setIsPopUpOpen(false)}
        />
      </div>
    </main>
  );
}
