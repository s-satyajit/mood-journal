export const exportToCSV = (entries) => {
    const csvContent = [
      ['Date', 'Mood', 'Notes', 'Temperature', 'Weather Condition'],
      ...entries.map(entry => [
        new Date(entry.date).toLocaleDateString(),
        entry.mood.label,
        entry.notes,
        entry.weather?.temp || 'N/A',
        entry.weather?.condition || 'N/A'
      ])
    ].map(e => e.join(',')).join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mood-journal.csv';
    a.click();
  };
  
  export const exportToPDF = (entries) => {
    import('jspdf').then((jsPDF) => {
      const doc = new jsPDF.default();
      doc.text('Mood Journal Entries', 10, 10);
      
      entries.forEach((entry, index) => {
        const y = 20 + (index * 30);
        doc.text(`${entry.mood.emoji} ${new Date(entry.date).toLocaleDateString()}`, 10, y);
        doc.text(`Mood: ${entry.mood.label} | Weather: ${entry.weather?.temp}°C ${entry.weather?.condition}`, 10, y + 5);
        doc.text(`Notes: ${entry.notes}`, 10, y + 10);
      });
  
      doc.save('mood-journal.pdf');
    });
  };