import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, parseISO } from 'date-fns';

const MoodTrendChart = ({ entries, range = 'week' }) => {
  const processData = () => {
    const moodCounts = {};
    
    entries.forEach(entry => {
      const date = parseISO(entry.date);
      const key = range === 'week' 
        ? format(startOfWeek(date), 'yyyy-MM-dd') 
        : format(date, 'yyyy-MM');

      if (!moodCounts[key]) {
        moodCounts[key] = {
          date: key,
          ...Object.fromEntries(moods.map(m => [m.label, 0]))
        };
      }
      moodCounts[key][entry.mood.label]++;
    });

    return Object.values(moodCounts);
  };

  return (
    <div className="bg-white/30 p-4 rounded-lg backdrop-blur-lg h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={processData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTrendChart