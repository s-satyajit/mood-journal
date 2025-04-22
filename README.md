# Mood Journal

A beautiful React application that helps you track your daily mood and thoughts with weather integration.

## Features

- 📅 Calendar view to track entries by date
- 😊 Intuitive mood selection interface
- 📝 Journal entry functionality for your thoughts
- 🌤️ Automatic weather integration based on your location

## Tech Stack

- React
- Tailwind CSS
- Axios for API requests
- Local Storage for data persistence
- OpenWeather API for weather data

## Getting Started

### Prerequisites

- NPM or Yarn
- OpenWeather API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/s-satyajit/mood-journal.git
   cd mood-journal
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeather API key
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```
   npm run dev
   ```

## Usage

- Select a date on the calendar to create or view an entry
- Choose your mood using the mood picker
- Add notes about your day
- Click "Save Entry" to store your entry
- Toggle between Calendar and All Notes views

## Project Structure

```
src/
├── components/
│   ├── AllNotesView.jsx    # Display all journal entries
│   ├── CalenderView.jsx    # Calendar interface for date selection
│   ├── Header.jsx          # App header with date display
│   ├── MoodPicker.jsx      # Mood selection interface
│   ├── MoodTrendChart.jsx  # Visualization of mood patterns
│   └── WeatherDisplay.jsx  # Shows current weather information
├── utils/                  # Utility functions
├── assets/                 # Static assets
├── App.jsx                 # Main application component
├── App.css                 # Application styles
├── main.jsx                # Application entry point
└── index.css               # Global styles
```

## Deployment

To build the project for production:

```
npm run build
```

The build files will be in the `dist` directory, ready to be deployed to platforms like Netlify, Vercel, or GitHub Pages.

## Troubleshooting

### Location Access

- The app requires location access to fetch weather data
- If you deny location access, weather features won't work
- You can reset location permissions in your browser settings

### Data Storage

- If entries aren't saving, check that localStorage is enabled in your browser
- Clearing browser data will erase all journal entries

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Privacy

Your data is stored locally in your browser and is not sent to any external servers (except for weather information).

## License

This project is licensed under the [MIT License](LICENSE).
