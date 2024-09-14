import React, { useState } from 'react';
import './App.css';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [baristas, setBaristas] = useState([{ name: '', availability: {} }]);
  const [considerations, setConsiderations] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

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

  const generatePrompt = () => {
    let prompt = "Generate a barista schedule for a coffee shop with the following information:\n\n";
    prompt += "Baristas and their availability:\n";
    baristas.forEach(barista => {
      prompt += `${barista.name}:\n`;
      Object.entries(barista.availability).forEach(([day, availableShifts]) => {
        prompt += `  ${day}: ${availableShifts.join(', ')}\n`;
      });
    });
    prompt += "\nAdditional considerations:\n";
    prompt += considerations;
    prompt += "\n\nPlease create a weekly schedule that optimizes coverage and considers the provided information.";
    setGeneratedPrompt(prompt);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <h1>Nili's Barista Schedule Generator</h1>
      {baristas.map((barista, index) => (
        <div key={index} className="barista-container">
          <input
            type="text"
            value={barista.name}
            onChange={(e) => updateBarista(index, 'name', e.target.value)}
            placeholder="Barista Name"
          />
          <div className="availability-grid">
            {daysOfWeek.map(day => (
              <div key={day} className="day-column">
                <h3>{day}</h3>
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
        </div>
      ))}
      <textarea
        value={considerations}
        onChange={(e) => setConsiderations(e.target.value)}
        placeholder="Additional considerations..."
      />
      <div className="button-container">  
        <button onClick={addBarista}>Add Barista</button>
        <button onClick={generatePrompt}>Generate Prompt</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Generated Prompt</h2>
        <pre>{generatedPrompt}</pre>
      </Modal>
    </div>
  );
}

export default App;
