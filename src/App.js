import React, { useState } from 'react';
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
      name: 'Giorgio',
      availability: {
        Monday: ['6:30am - 1pm', '1pm - 6:30pm'],
        Tuesday: ['6:30am - 2pm', '2pm - 8:30pm'],
        Wednesday: ['1pm - 6:30pm'],
        Thursday: ['6:30am - 2pm', '2pm - 8:30pm'],
        Friday: ['6:30am - 1pm', '1pm - 6:30pm'],
        Saturday: ['7:30am - 2pm'],
        Sunday: ['1pm - 6:30pm']
      }
    },
    {
      name: 'Jelisa',
      availability: {
        Monday: ['2pm - 8:30pm'],
        Tuesday: ['6:30am - 1pm', '1pm - 6:30pm'],
        Wednesday: ['6:30am - 2pm', '2pm - 8:30pm'],
        Thursday: ['1pm - 6:30pm'],
        Friday: ['6:30am - 2pm', '2pm - 8:30pm'],
        Saturday: ['1pm - 6:30pm', '2pm - 8:30pm'],
        Sunday: ['7:30am - 1pm']
      }
    },
    {
      name: 'Paula',
      availability: {
        Monday: ['1pm - 6:30pm'],
        Tuesday: ['2pm - 8:30pm'],
        Wednesday: ['6:30am - 1pm', '1pm - 6:30pm'],
        Thursday: ['6:30am - 2pm'],
        Friday: ['2pm - 8:30pm'],
        Saturday: ['7:30am - 2pm', '2pm - 8:30pm'],
        Sunday: ['7:30am - 2pm', '2pm - 8:30pm']
      }
    }
  ]);

  const [considerations, setConsiderations] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [removedBaristas, setRemovedBaristas] = useState([]);

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
      prompt += "\n";
    });

    if (considerations.trim()) {
      prompt += "Additional considerations:\n";
      prompt += considerations + "\n";
    }

    prompt += "\nPlease create a weekly schedule that optimizes coverage and considers the provided information.";
    setGeneratedPrompt(prompt);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="BaristaFlow Logo" className="logo" />
        <div className="title-container">
          <h1>BaristaFlow</h1>
          <span>Barista Schedule Generator</span>
        </div>
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
            <input
              className="barista-name"
              type="text"
              value={barista.name}
              onChange={(e) => updateBarista(index, 'name', e.target.value)}
              placeholder="Barista Name"
            />
            <h4>Select {barista.name}'s availability</h4>
            <button onClick={() => removeBarista(index)} className="remove-button">Remove Barista</button>
          </div>
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
