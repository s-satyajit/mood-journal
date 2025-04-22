import {
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth
} from 'date-fns';
  
  export default function CalendarView({ entries, onDateSelect, selectedDate }) {
    const currentDate = new Date();
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
    const getEntryForDate = (date) => {
      return entries.find(entry => 
        isSameDay(new Date(entry.date), date)
      );
    };
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
          {daysInMonth.map((date) => {
            const entry = getEntryForDate(date);
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            
            return (
              <button
                key={date}
                onClick={() => onDateSelect(date)}
                className={`p-2 text-center rounded-lg transition-all duration-200
                  ${isSameMonth(date, currentDate) ? '' : 'text-gray-400'}
                  ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                  ${isToday && !isSelected ? 'ring-2 ring-blue-300' : ''}`}
              >
                <div className={`text-sm ${isSelected ? 'font-bold' : ''}`}>
                  {format(date, 'd')}
                </div>
                {entry && (
                  <span className="text-2xl block mt-1">
                    {entry.mood.emoji}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }