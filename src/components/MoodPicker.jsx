import React, { useState } from 'react';

const moods = [
  { id: 1, emoji: '😊', label: 'Happy', color: 'bg-yellow-300' },
  { id: 2, emoji: '😢', label: 'Sad', color: 'bg-blue-300' },
  { id: 3, emoji: '😠', label: 'Angry', color: 'bg-red-300' },
  { id: 4, emoji: '😐', label: 'Neutral', color: 'bg-gray-300' },
  { id: 5, emoji: '🌟', label: 'Excited', color: 'bg-purple-300' },
];

export default function MoodPicker({ onMoodSelect }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="flex gap-4 justify-center">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodClick(mood)}
            className={`text-4xl p-4 rounded-full hover:scale-110 transition-all ${
              selectedMood?.id === mood.id ? 'ring-4 ring-black' : ''
            } ${mood.color}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}