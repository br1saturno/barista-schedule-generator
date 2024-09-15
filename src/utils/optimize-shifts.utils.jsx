export const optimizeShifts = (baristas, daysOfWeek, shifts) => {
    const schedule = {};
    daysOfWeek.forEach(day => {
      schedule[day] = {};
      const dayShifts = day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday;
      dayShifts.forEach(shift => {
        schedule[day][shift] = null; // Initialize with null instead of an empty array
      });
    });
  
    const baristaShiftCounts = {};
    const baristaOpeningShifts = {};
    const baristaMaxShifts = {};
    baristas.forEach(barista => {
      baristaShiftCounts[barista.name] = 0;
      baristaOpeningShifts[barista.name] = 0;
      // Set max shifts based on barista constraints
      if (barista.mustHave5Shifts) {
        baristaMaxShifts[barista.name] = 5;
      } else if (barista.fixedShifts) {
        baristaMaxShifts[barista.name] = parseInt(barista.fixedShifts);
      } else {
        baristaMaxShifts[barista.name] = 5; // Default max shifts
      }
    });
  
    daysOfWeek.forEach(day => {
      const dayShifts = day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday;
      const assignedBaristasForDay = new Set();
  
      dayShifts.forEach((shift, shiftIndex) => {
        const availableBaristas = baristas.filter(barista => 
          barista.availability[day]?.includes(shift) &&
          baristaShiftCounts[barista.name] < baristaMaxShifts[barista.name] &&
          !assignedBaristasForDay.has(barista.name)
        );
  
        availableBaristas.sort((a, b) => {
          // Prioritize baristas who must have 5 shifts
          if (a.mustHave5Shifts && !b.mustHave5Shifts) return -1;
          if (!a.mustHave5Shifts && b.mustHave5Shifts) return 1;
  
          if (shiftIndex === 0) {
            return baristaOpeningShifts[b.name] - baristaOpeningShifts[a.name];
          }
          // Prioritize baristas with fewer shifts, considering their max shifts
          const aShiftRatio = baristaShiftCounts[a.name] / baristaMaxShifts[a.name];
          const bShiftRatio = baristaShiftCounts[b.name] / baristaMaxShifts[b.name];
          return aShiftRatio - bShiftRatio;
        });
  
        if (availableBaristas.length > 0) {
          const barista = availableBaristas[0];
          schedule[day][shift] = barista.name;
          baristaShiftCounts[barista.name]++;
          assignedBaristasForDay.add(barista.name);
          if (shiftIndex === 0) {
            baristaOpeningShifts[barista.name]++;
          }
        }
      });
    });
  
    // Handle baristas who must have 5 shifts
    baristas.forEach(barista => {
      if (barista.mustHave5Shifts && baristaShiftCounts[barista.name] < 5) {
        // Find additional shifts for this barista
        daysOfWeek.forEach(day => {
          const dayShifts = day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday;
          const assignedBaristasForDay = new Set(
            dayShifts.flatMap(shift => schedule[day][shift])
          );

          if (!assignedBaristasForDay.has(barista.name)) {
            for (const shift of dayShifts) {
              if (baristaShiftCounts[barista.name] < 5 &&
                  barista.availability[day]?.includes(shift) &&
                  schedule[day][shift] === null) {
                schedule[day][shift] = barista.name;
                baristaShiftCounts[barista.name]++;
                assignedBaristasForDay.add(barista.name);
                break; // Now this break is valid
              }
            }
          }
        });
      }
    });
  
    return schedule;
  };