export default function Card({ title }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
    </div>
  );
}