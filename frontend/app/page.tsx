

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import TodoList from '@/components/features/TodoList';


const date = new Date().toLocaleDateString();

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Todo List {date}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Enter A task To Get Started
          </p>
          <div className="mt-12 space-y-4">
            <TodoList />
          </div>
        </div>
      </div>
    </main>
  );
}