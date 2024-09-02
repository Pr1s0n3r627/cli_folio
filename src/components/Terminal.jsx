import React, { useState } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);

  const commands = {
    help: 'Available commands: help, about, projects, easter-egg',
    about: 'This is a personal portfolio terminal.',
    projects: 'Check out my projects on GitHub.',
    'easter-egg': 'Congrats! You found the easter egg.'
  };

  const handleCommand = (command) => {
    if (commands[command]) {
      setOutput(prevOutput => [...prevOutput, `> ${command}`, commands[command]]);
    } else {
      setOutput(prevOutput => [...prevOutput, `> ${command}`, 'Command not found.']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput(''); // Clear input after submission
    }
  };

  return (
    <div style={{
      backgroundColor: '#000',
      padding: '20px',
      color: '#61dafb',
      minHeight: '100vh',
      width: '100vw',
      fontFamily: 'monospace',
      fontSize: '16px',
      overflowY: 'auto',
      boxSizing: 'border-box'
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
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
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
