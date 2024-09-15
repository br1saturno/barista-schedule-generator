export const optimizeShifts = (baristas, daysOfWeek, shifts) => {
    const schedule = {};
    daysOfWeek.forEach(day => {
      schedule[day] = {};
      const dayShifts = day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday;
      dayShifts.forEach(shift => {
        schedule[day][shift] = [];
      });
    });
  
    const baristaShiftCounts = {};
    const baristaOpeningShifts = {};
    baristas.forEach(barista => {
      baristaShiftCounts[barista.name] = 0;
      baristaOpeningShifts[barista.name] = 0;
    });
  
    daysOfWeek.forEach(day => {
      const dayShifts = day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday;
      dayShifts.forEach((shift, shiftIndex) => {
        const availableBaristas = baristas.filter(barista => 
          barista.availability[day]?.includes(shift) &&
          baristaShiftCounts[barista.name] < 5 &&
          (shiftIndex === 0 || !schedule[day][dayShifts[shiftIndex - 1]].includes(barista.name))
        );
  
        availableBaristas.sort((a, b) => {
          if (shiftIndex === 0) {
            return baristaOpeningShifts[b.name] - baristaOpeningShifts[a.name];
          }
          return baristaShiftCounts[a.name] - baristaShiftCounts[b.name];
        });
  
        for (let i = 0; i < 2 && i < availableBaristas.length; i++) {
          const barista = availableBaristas[i];
          schedule[day][shift].push(barista.name);
          baristaShiftCounts[barista.name]++;
          if (shiftIndex === 0) {
            baristaOpeningShifts[barista.name]++;
          }
        }
      });
    });
  
    return schedule;
  };