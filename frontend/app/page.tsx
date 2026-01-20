'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import TodoList from '@/components/features/TodoList';


export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log(user)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // If not logged in, send them to the auth page
        router.push('/auth');
      } else {
        // If logged in, save the user and stop loading
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return null; // Prevent rendering before auth state is determined
  }

  // Show a blank screen or spinner while checking login status
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading your tasks...
        </div>
      </div>
    );
  }

  // Only renders if user is signed in
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My To-Do List</h1>
          <button 
            color ="red"
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={async () => {
              await auth.signOut();
              router.push('/auth');
            }}
          >
            Sign Out
          </button>
        </div>
        
        <TodoList />
      </div>
    </main>
  );
}