

const OptimizedSchedule = ({ schedule }) => {
    if (!schedule) return null;

  return (
    <div className="optimized-schedule">
      <h2>Optimized Schedule</h2>
      {Object.entries(schedule).map(([day, shifts]) => (
        <div key={day} className="day-schedule">
          <h3>{day}</h3>
          {Object.entries(shifts).map(([shift, baristas]) => (
            <div key={shift} className="shift-schedule">
              <strong>{shift}:</strong> 
              {baristas.length === 2 ? baristas.join(', ') : 
               baristas.length === 1 ? `${baristas[0]} (Understaffed)` : 
               'Unstaffed'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  }

export default OptimizedSchedule;
