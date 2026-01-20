export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-gray-900"
      />
    </div>
  );
}