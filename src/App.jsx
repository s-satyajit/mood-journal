import { useState, useEffect } from 'react';
import Header from './components/Header';
import MoodPicker from './components/MoodPicker';
import WeatherDisplay from './components/WeatherDisplay';
// import CalendarView from './components/CalendarView';
import CalendarView from './components/CalenderView';
import AllNotesView from './components/AllNotesView';
import axios from 'axios';


export default function App() {
  const [weather, setWeather] = useState(null);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date(),
    mood: null,
    notes: "",
  });
  const [entries, setEntries] = useState([]);
  const [viewMode, setViewMode] = useState("calendar");

  useEffect(() => {
    const API_KEY = "6d636fd84afe2a225b1ec23092459511";

    const fetchData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`
        );

        setWeather({
          temp: Math.round(response.data.main.temp),
          condition: response.data.weather[0].main,
          location: response.data.name,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Please enable location permissions to use this app");
      }
    };

    fetchData();
    const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(savedEntries);
  }, []);

  const saveEntry = () => {
    const newEntry = {
      date: currentEntry.date.toISOString(),
      mood: currentEntry.mood,
      notes: currentEntry.notes,
      weather,
    };

    const updatedEntries = [
      ...entries.filter(
        (entry) =>
          format(new Date(entry.date), "yyyy-MM-dd") !==
          format(currentEntry.date, "yyyy-MM-dd")
      ),
      newEntry,
    ];

    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
    setCurrentEntry((prev) => ({ ...prev, mood: null, notes: "" }));
  };
  // ... existing state and logic ...

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-50"></div>
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUwMCIgY3k9IjUwMCIgcj0iMjAwIiBmaWxsPSIjZmZmZmZmM2UiLz48Y2lyY2xlIGN4PSI4MDAiIGN5PSI3MDAiIHI9IjE1MCIgZmlsbD0iI2ZmZmZmZjNlIi8+PC9zdmc+')] opacity-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header date={currentEntry.date} />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl backdrop-blur-sm">
          {/* View toggle buttons with glassmorphism effect */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg backdrop-blur-lg ${
                viewMode === 'calendar' 
                  ? 'bg-white/30 text-blue-600 shadow-lg' 
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              } transition-all`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('notes')}
              className={`px-4 py-2 rounded-lg backdrop-blur-lg ${
                viewMode === 'notes' 
                  ? 'bg-white/30 text-blue-600 shadow-lg' 
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              } transition-all`}
            >
              All Notes
            </button>
          </div>

          {viewMode === 'calendar' ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Weather Card with Glass Effect */}
              <div className="bg-white/30 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20">
                <WeatherDisplay weather={weather} />
              </div>

              {/* Input Section */}
              <div className="space-y-6">
                <div className="bg-white/30 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20">
                  <MoodPicker onMoodSelect={mood => 
                    setCurrentEntry(prev => ({ ...prev, mood }))} 
                  />
                  <textarea
                    placeholder="How was your day..."
                    className="w-full p-4 border rounded-lg mt-4 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    value={currentEntry.notes}
                    onChange={e => 
                      setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))
                    }
                    maxLength={200}
                    rows={3}
                  />
                  <button
                    onClick={saveEntry}
                    className="mt-4 bg-blue-500/90 hover:bg-blue-600 text-white px-6 py-2 rounded-lg backdrop-blur-sm transition-all hover:shadow-lg"
                  >
                    Save Entry
                  </button>
                </div>
              </div>

              {/* Calendar */}
              <div className="lg:col-span-2">
                <CalendarView 
                  entries={entries} 
                  onDateSelect={date => setCurrentEntry(prev => ({ ...prev, date }))}
                  selectedDate={currentEntry.date}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white/30 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20">
              <AllNotesView entries={entries} />
            </div>
          )}
        </main>
      </div>

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-200/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
