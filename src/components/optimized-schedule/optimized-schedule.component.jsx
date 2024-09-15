import './optimized-schedule.styles.css';

const OptimizedSchedule = ({ schedule }) => {
    if (!schedule) return null;

    return (
    <div className="optimized-schedule">
        <h3>Optimized Schedule</h3>
        <div className="schedule-container">
            {Object.entries(schedule).map(([day, shifts]) => (
                <div key={day} className="day-schedule">
                <h4>{day}</h4>
                {Object.entries(shifts).map(([shift, barista]) => (
                    <div key={shift} className="shift-schedule">
                    <strong>{shift}: </strong> 
                    {barista ? barista : 'Unstaffed'}
                    </div>
                ))}
                </div>
            ))}
        </div>
    </div>
    );
}

export default OptimizedSchedule;
