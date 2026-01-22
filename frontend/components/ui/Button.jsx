export default function Button({
  children,
  onClick,
  color = "blue",
  size = "md",
}) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    gray: "bg-gray-600 hover:bg-gray-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-md px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} ${sizes[size]} text-white rounded-lg font-medium`}
    >
      {children}
    </button>
  );
}
