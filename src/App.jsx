import { useState, useEffect } from "react";
import { format } from "date-fns";
import Header from "./components/Header";
import MoodPicker from "./components/MoodPicker";
import WeatherDisplay from "./components/WeatherDisplay";
import CalendarView from "./components/CalenderView";
import AllNotesView from "./components/AllNotesView";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [weather, setWeather] = useState(null);
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date(),
    mood: null,
    notes: "",
  });
  const [entries, setEntries] = useState([]);
  const [viewMode, setViewMode] = useState("calendar"); // 'calendar' or 'notes'

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

  return (
    <div
      className="min-h-screen bg-gray-50 style={{
      backgroundColor: currentEntry.mood?color || '#f3f4f6' 
    }}"
    >
      <Header date={currentEntry.date} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex gap-4 mb-6">
          <motion.button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "calendar"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Calendar
          </motion.button>
          <motion.button
            onClick={() => setViewMode("notes")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "notes"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All Notes
          </motion.button>
        </div>

        {viewMode === "calendar" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <WeatherDisplay weather={weather} />
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <MoodPicker
                  onMoodSelect={(mood) =>
                    setCurrentEntry((prev) => ({ ...prev, mood }))
                  }
                />
                <textarea
                  placeholder="How was your day..."
                  className="w-full p-4 border rounded-lg mt-4"
                  value={currentEntry.notes}
                  onChange={(e) =>
                    setCurrentEntry((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  maxLength={200}
                  rows={3}
                />
                <motion.button
                  onClick={saveEntry}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
                >
                  Save Entry
                </motion.button>
              </div>
            </div>
            <CalendarView
              entries={entries}
              onDateSelect={(date) =>
                setCurrentEntry((prev) => ({ ...prev, date }))
              }
              selectedDate={currentEntry.date}
            />
          </div>
        ) : (
          <AllNotesView entries={entries} />
        )}
      </main>
    </div>
  );
}

export default App;
