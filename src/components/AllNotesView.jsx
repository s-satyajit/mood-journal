// components/AllNotesView.jsx
export default function AllNotesView({ entries }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Notes</h2>
        <div className="space-y-4">
          {entries
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry) => (
              <div key={entry.date} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{entry.mood.emoji}</span>
                  <span className="text-gray-600">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  {entry.weather && (
                    <span className="text-sm text-gray-500 ml-2">
                      {entry.weather.temp}°C - {entry.weather.condition}
                    </span>
                  )}
                </div>
                <p className="text-gray-800">{entry.notes}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }