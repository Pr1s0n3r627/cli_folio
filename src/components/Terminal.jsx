import React, { useState, useEffect } from 'react';
import commandsData from '../assets/commands.json'; // Make sure this path is correct
import useTypingEffect from '../hooks/useTypingEffect'; // Hook for typing animation

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commands, setCommands] = useState({});
  const [isTyping, setIsTyping] = useState(false);

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
      setIsTyping(true);  // Start typing effect
      handleCommand(input.trim());
      setInput(''); // Clear input after submission
    }
  };

  // Only apply typing effect to the last valid command output
  const lastOutput = output.length > 0 ? output[output.length - 1] : '';
  const typedText = useTypingEffect(lastOutput, 100, () => setIsTyping(false)); // Callback to stop typing

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
        {output.slice(0, -1).map((line, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>{line}</div>
        ))}
        {/* Render typing effect if typing is active */}
        {isTyping ? <div>{typedText}</div> : lastOutput && <div>{lastOutput}</div>}
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
