/*import React, { useState, useEffect } from 'react';
import commandsData from '../assets/commands.json'; // Correct path

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commands, setCommands] = useState({});

  // Load commands from the JSON file when the component mounts
  useEffect(() => {
    setCommands(commandsData.commands);
  }, []);

  const handleCommand = (command) => {
    if (commands[command]) {
      if (command === 'easter-egg') {
        window.location.href = commandsData.easterEgg.url;
      } else {
        setOutput(prevOutput => [...prevOutput, `> ${command}`, commands[command]]);
      }
    } else {
      setOutput(prevOutput => [...prevOutput, `> ${command}`, 'Command not found.']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput(''); // Clear the input after submission
    }
  };

  return (
    <div style={{
      backgroundColor: '#000',
      padding: '20px',
      color: '#61dafb',
      borderRadius: '10px',
      minHeight: '100vh', // Full viewport height
      width: '100vw', // Full viewport width
      fontFamily: 'monospace',
      fontSize: '16px',
      overflowY: 'auto', // Allows scrolling if content overflows
      boxSizing: 'border-box' // Ensures padding is included in height/width calculations
    }}>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {output.map((line, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
      <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Type a command"
  style={{
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    color: '#61dafb',
    backgroundColor: 'transparent', // Transparent background
    border: 'none', // No border
    outline: 'none', // No outline on focus
    marginTop: '10px',
    fontFamily: 'monospace',
    boxSizing: 'border-box'
  }}
/>
      </form>
    </div>
  );
};

export default Terminal;
*/

import React, { useState, useEffect } from 'react';
import commandsData from '../assets/commands.json'; // Correct path
import useTypingEffect from '../hooks/useTypingEffect'; // Importing the typing effect hook

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commands, setCommands] = useState({});

  // Load commands from the JSON file when the component mounts
  useEffect(() => {
    setCommands(commandsData.commands);
  }, []);

  const handleCommand = (command) => {
    if (commands[command]) {
      if (command === 'easter-egg') {
        window.location.href = commandsData.easterEgg.url;
      } else {
        setOutput(prevOutput => [...prevOutput, `> ${command}`, commands[command]]);
      }
    } else {
      setOutput(prevOutput => [...prevOutput, `> ${command}`, 'Command not found.']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput(''); // Clear the input after submission
    }
  };

  // Ensure the last output is a valid string
  const lastOutput = output.length > 0 ? output[output.length - 1] : '';
  const typedText = lastOutput ? useTypingEffect(lastOutput, 100) : ''; // Apply typing effect only if valid

  return (
    <div style={{
      backgroundColor: '#000',
      padding: '20px',
      color: '#61dafb',
      borderRadius: '10px',
      minHeight: '100vh', // Full viewport height
      width: '100vw', // Full viewport width
      fontFamily: 'monospace',
      fontSize: '16px',
      overflowY: 'auto', // Allows scrolling if content overflows
      boxSizing: 'border-box' // Ensures padding is included in height/width calculations
    }}>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {output.slice(0, -1).map((line, index) => ( // Render all but the last line without animation
          <div key={index} style={{ marginBottom: '10px' }}>{line}</div>
        ))}
        {typedText && <div>{typedText}</div>} {/* Render typing effect only if there's valid text */}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            color: '#61dafb',
            backgroundColor: 'transparent', // Transparent background
            border: 'none', // No border
            outline: 'none', // No outline on focus
            marginTop: '10px',
            fontFamily: 'monospace',
            boxSizing: 'border-box'
          }}
        />
      </form>
    </div>
  );
};

export default Terminal;
