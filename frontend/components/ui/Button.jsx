export default function Button({ children, onClick, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    red: 'bg-red-600 hover:bg-red-700',
    green: 'bg-green-600 hover:bg-green-700',
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white px-4 py-2 rounded-lg font-medium`}
    >
      {children}
    </button>
  );
}