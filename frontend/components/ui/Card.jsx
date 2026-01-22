// src/components/ui/Card.js
export default function Card({ children }) {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 transition-transform duration-150 hover:scale-102 cursor-pointer">
      {children}
    </div>
  );
}
