'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') setError('No user found with this email.');
      else if (err.code === 'auth/wrong-password') setError('Incorrect password.');
      else setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md border-gray-300 shadow-xl"> 
        <div className="w-full p-10">
          <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-base text-red-600 border border-red-200 font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-lg font-bold text-gray-800 mb-2">Email</label>
              <input
                type="email"
                required
                // Changed text-gray-900 for dark typing and border-gray-400 for clear boundaries
                className="w-full rounded-lg border border-gray-400 bg-white p-4 text-lg text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-800 mb-2">Password</label>
              <input
                type="password"
                required
                // Changed text-gray-900 for dark typing
                className="w-full rounded-lg border border-gray-400 bg-white p-4 text-lg text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button color="blue" className="w-full py-4 text-xl font-bold rounded-lg shadow-lg hover:bg-blue-700 active:transform active:scale-95 transition-all">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-10 text-center text-lg">
            <span className="text-gray-700 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-extrabold text-blue-700 hover:text-blue-900 hover:underline transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}