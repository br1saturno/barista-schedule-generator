import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { optimizeShifts } from './utils/optimize-shifts.utils';
import OptimizedSchedule from './components/optimized-schedule/optimized-schedule.component';
import './App.css';
import logo from '../src/assets/images/brand/logo.png'; 

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    const promptText = document.querySelector('.modal-content pre').textContent;
    navigator.clipboard.writeText(promptText).then(() => {
      alert('Prompt copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="modal-overlay">
      <button className="modal-close" onClick={onClose}>&times;</button>
      <div className="modal-content">
        {children}
        <div className="modal-actions">
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
            <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [baristas, setBaristas] = useState([
    {
      name: 'Sheelagh Darling Pletsch',
      availability: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      }
    },
    {
      name: 'Paula Echeverri',
      availability: {
        Monday: ['6:30am - 1pm',],
        Tuesday: ['1pm - 6:30pm', '2pm - 8:30pm'],
        Wednesday: ['1pm - 6:30pm', '2pm - 8:30pm'],
        Thursday: ['1pm - 6:30pm', '2pm - 8:30pm'],
        Friday: [],
        Saturday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Sunday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm']
      }
    },
    {
      name: 'Giorgio Saturno',
      availability: {
        Monday: ['6:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Tuesday: ['6:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Wednesday: ['6:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Thursday: ['6:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Friday: ['6:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Saturday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Sunday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm']
      }
    },
    {
      name: 'Paul Rome',
      availability: {
        Monday: [],
        Tuesday: ['6:30am - 1pm', ],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      }
    },
    {
      name: 'Jelisa Palenque',
      availability: {
        Monday: ['6:30am - 1pm', '1pm - 2pm'],
        Tuesday: ['6:30am - 1pm', '1pm - 2pm'],
        Wednesday: ['6:30am - 1pm', '1pm - 2pm'],
        Thursday: ['6:30am - 1pm', '1pm - 2pm'],
        Friday: [],
        Saturday: [],
        Sunday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm']
      }
    },
    {
      name: 'Latoya Edwards',
      availability: {
        Monday: [],
        Tuesday: ['6:30am - 1pm', '6:30am - 2pm',],
        Wednesday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Thursday: [],
        Friday: ['6:30am - 1pm', '6:30am - 2pm',],
        Saturday: ['6:30am - 1pm', '6:30am - 2pm',],
        Sunday: []
      }
    },
    {
      name: 'Tom Perkins',
      availability: {
        Monday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Tuesday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Wednesday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Thursday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Friday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Saturday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Sunday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
      }
    },
    {
      name: 'Lauren Higgins',
      availability: {
        Monday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Tuesday: ['7:30am - 1pm', '7:30am - 2pm',],
        Wednesday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Thursday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Friday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Saturday: ['7:30am - 1pm', '7:30am - 2pm',],
        Sunday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
      }
    },
    {
      name: 'Brian Snyder',
      availability: {
        Monday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Tuesday: ['2pm - 8:30pm'],
        Wednesday: [],
        Thursday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Friday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Saturday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
        Sunday: ['7:30am - 1pm', '7:30am - 2pm', '1pm - 6:30pm', '2pm - 8:30pm'],
      }
    }
  ]);

  const [considerations, setConsiderations] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [removedBaristas, setRemovedBaristas] = useState([]);
  const [optimizedSchedule, setOptimizedSchedule] = useState(null);
  const [visibleGrids, setVisibleGrids] = useState({});

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const shifts = {
    weekday: [
      '6:30am - 1pm',
      '6:30am - 2pm',
      '1pm - 6:30pm',
      '2pm - 8:30pm'
    ],
    weekend: [
      '7:30am - 1pm',
      '7:30am - 2pm',
      '1pm - 6:30pm',
      '2pm - 8:30pm'
    ]
  };

  const addBarista = () => {
    setBaristas([...baristas, { name: '', availability: {} }]);
  };

  const handleRemoveBarista = (indexToRemove) => {
    const baristaToRemove = baristas[indexToRemove];
    setBaristas(baristas.filter((_, index) => index !== indexToRemove));
    setRemovedBaristas([...removedBaristas, baristaToRemove]);
  };

  const handleAddRemovedBarista = (indexToAdd) => {
    const baristaToAdd = removedBaristas[indexToAdd];
    setBaristas([...baristas, baristaToAdd]);
    setRemovedBaristas(removedBaristas.filter((_, index) => index !== indexToAdd));
  };

  const removeBarista = (index) => {
    handleRemoveBarista(index);
  };

  const updateBarista = (index, field, value) => {
    const updatedBaristas = [...baristas];
    updatedBaristas[index][field] = value;
    setBaristas(updatedBaristas);
  };

  const toggleAvailability = (baristaIndex, day, shift) => {
    const updatedBaristas = [...baristas];
    if (!updatedBaristas[baristaIndex].availability[day]) {
      updatedBaristas[baristaIndex].availability[day] = [];
    }
    const shiftIndex = updatedBaristas[baristaIndex].availability[day].indexOf(shift);
    if (shiftIndex > -1) {
      updatedBaristas[baristaIndex].availability[day].splice(shiftIndex, 1);
    } else {
      updatedBaristas[baristaIndex].availability[day].push(shift);
    }
    setBaristas(updatedBaristas);
  };

  const toggleAvailabilityGrid = (index) => {
    setVisibleGrids(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const generatePrompt = () => {
    let prompt = "Generate a barista schedule for a coffee shop with the following information:\n\n";
  
    prompt += "Available shifts:\n";
    prompt += "Weekdays (Monday to Friday):\n";
    shifts.weekday.forEach(shift => prompt += `  ${shift}\n`);
    prompt += "Weekends (Saturday and Sunday):\n";
    shifts.weekend.forEach(shift => prompt += `  ${shift}\n`);
  
    prompt += "\nBaristas and their availability:\n";
    baristas.forEach(barista => {
      prompt += `${barista.name}:\n`;
      Object.entries(barista.availability).forEach(([day, availableShifts]) => {
        prompt += `  ${day}: ${availableShifts.join(', ')}\n`;
      });
      if (barista.mustHave5Shifts) {
        prompt += `  Constraint: Must have exactly 5 shifts per week\n`;
      } else if (barista.onlyHaveFixedShifts && barista.fixedShifts) {
        prompt += `  Constraint: Can only have ${barista.fixedShifts} shifts per week\n`;
      }

      prompt += "\n";
    });

    if (considerations.trim()) {
      prompt += "Additional considerations:\n";
      prompt += considerations + "\n\n";
    }

    prompt += "General constraints:\n";
    prompt += "- Each shift should have exactly one barista assigned\n";
    prompt += "- No barista should work more than one shift per day\n";
    prompt += "- Try to distribute opening shifts (first shift of the day) evenly among baristas\n";
    prompt += "- Ensure a fair distribution of shifts among baristas, considering their individual constraints\n\n";

    prompt += "\nPlease create a weekly schedule that optimizes coverage and considers the provided information.";
    setGeneratedPrompt(prompt);
    setIsModalOpen(true);
  };

  const toggleAllShifts = (baristaIndex) => {
    const updatedBaristas = [...baristas];
    const barista = updatedBaristas[baristaIndex];
    
    // Check if all shifts are currently selected
    const allSelected = daysOfWeek.every(day => 
      (day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday)
        .every(shift => barista.availability[day]?.includes(shift))
    );
  
    // Toggle all shifts
    daysOfWeek.forEach(day => {
      const dayShifts = day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday;
      if (!barista.availability[day]) {
        barista.availability[day] = [];
      }
      dayShifts.forEach(shift => {
        if (allSelected) {
          // Remove all shifts
          barista.availability[day] = [];
        } else {
          // Add all shifts
          if (!barista.availability[day].includes(shift)) {
            barista.availability[day].push(shift);
          }
        }
      });
    });
  
    setBaristas(updatedBaristas);
  };

  const updateBaristaConstraint = (index, constraint, value) => {
    const updatedBaristas = [...baristas];
    if (constraint === 'fixedShifts') {
      // Convert value to number and ensure it's within range
      const numValue = Math.min(Math.max(parseInt(value) || 0, 1), 7);
      updatedBaristas[index].fixedShifts = numValue;
      // Deactivate other constraints
      updatedBaristas[index].mustHave5Shifts = false;
      // Activate the corresponding constraint
      updatedBaristas[index].onlyHaveFixedShifts = numValue > 0;
    } else if (constraint === 'mustHave5Shifts') {
      updatedBaristas[index].mustHave5Shifts = value;
      // If activating mustHave5Shifts, deactivate others
      if (value) {
        updatedBaristas[index].fixedShifts = 0;
        updatedBaristas[index].onlyHaveFixedShifts = false;
      }
    } else if (constraint === 'onlyHaveFixedShifts') {
      updatedBaristas[index].onlyHaveFixedShifts = value;
      if (!value) {
        updatedBaristas[index].fixedShifts = 0;
      }
    }
    setBaristas(updatedBaristas);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-left">
        <img src={logo} alt="BaristaFlow Logo" className="logo" />
        <div className="title-container">
          <h1>BaristaFlow</h1>
          <span>Barista Schedule Generator</span>
        </div>
        </div>
        <button onClick={addBarista}>Add Barista</button>
      </div>
      {removedBaristas.length > 0 && (
        <div className="removed-baristas">
          {removedBaristas.map((barista, index) => (
            <button 
              key={index}
              className="add-removed-barista" 
              onClick={() => handleAddRemovedBarista(index)}
            >
              Add {barista.name}
            </button>
          ))}
        </div>
      )}
      {baristas.map((barista, index) => (
        <div key={index} className="barista-container">
          <div className="barista-header">
            <div className="barista-title-container">
              <h4>Select {barista.name}'s availability</h4>
            </div>
            <div className="barista-actions-container">
              <input
                className="barista-name"
              type="text"
              value={barista.name}
              onChange={(e) => updateBarista(index, 'name', e.target.value)}
              placeholder="Barista Name"
            />
            <button onClick={() => toggleAllShifts(index)} className="select-all-button">
              Select All Shifts
            </button>
            <button onClick={() => removeBarista(index)} className="remove-button">Remove Barista</button>
            <button onClick={() => toggleAvailabilityGrid(index)} className="toggle-grid-button">
              
              <FontAwesomeIcon icon={visibleGrids[index] ? faChevronUp : faChevronDown} />
              </button>
            </div>
          </div>
          <div className="barista-constraints">
            <label>
              <input
                type="checkbox"
                checked={barista.mustHave5Shifts || false}
                onChange={(e) => updateBaristaConstraint(index, 'mustHave5Shifts', e.target.checked)}
              />
              Must have 5 shifts
            </label>
            <div className="barista-constraints-input">
            <label>
            or can only have
            <input
                type="number"
                min="1"
                max="7"
                value={barista.fixedShifts || ''}
                onChange={(e) => updateBaristaConstraint(index, 'fixedShifts', e.target.value)}
              />
              shifts
              <input
                type="checkbox"
                checked={barista.onlyHaveFixedShifts || false}
                onChange={(e) => updateBaristaConstraint(index, 'onlyHaveFixedShifts', e.target.checked)}
              />
              </label>
            </div>
          </div>

          {visibleGrids[index] && (
            <div className="availability-grid">
            {daysOfWeek.map(day => (
              <div key={day} className="day-column">
                <h4>{day}</h4>
                {(day === 'Saturday' || day === 'Sunday' ? shifts.weekend : shifts.weekday).map(shift => (
                  <div
                    key={shift}
                    className={`shift-slot ${barista.availability[day]?.includes(shift) ? 'selected' : ''}`}
                    onClick={() => toggleAvailability(index, day, shift)}
                  >
                    {shift}
                  </div>
                ))}
              </div>
            ))}
          </div>
          )}
        </div>
      ))}
      
      <textarea
        value={considerations}
        onChange={(e) => setConsiderations(e.target.value)}
        placeholder="Additional considerations for prompt..."
      />
      <div className="button-container">
        <button onClick={addBarista}>Add Barista</button>
        <button onClick={generatePrompt}>Generate Prompt</button>
        <button onClick={() => setOptimizedSchedule(optimizeShifts(baristas, daysOfWeek, shifts))}>Optimize Shifts</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Generated Prompt</h2>
        <pre>{generatedPrompt}</pre>        
      </Modal>
      <div className="optimized-schedule-container">
        {optimizedSchedule && <OptimizedSchedule schedule={optimizedSchedule} />}
      </div>
    </div>
  );
}

export default App;
