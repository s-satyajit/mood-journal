export default function Header({ date }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800">Mood Journal</h1>
        <p className="mt-2 text-gray-600">
          {date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </header>
  );
}