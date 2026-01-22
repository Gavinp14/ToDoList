'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import TodoList from '@/components/features/TodoList';

export default function HomePage() {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
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
          <button 
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={signOutUser}
          >
            Sign Out
          </button>
        </div>
        
        <TodoList />
      </div>
    </main>
  );
}