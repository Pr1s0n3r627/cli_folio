import React, { useState, useEffect } from 'react';
import commandsData from '../assets/commands.json'; // Ensure correct path
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Import icons
import './Terminal.css'; // Ensure this CSS file is in the correct location

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commands, setCommands] = useState({});
  const [typingIndex, setTypingIndex] = useState(-1);
  const [typingContent, setTypingContent] = useState('');

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

/*// Start typing animation for the output
const startTypingAnimation = (text) => {
  setTypingIndex(0);
  setTypingContent('');
  const typingInterval = setInterval(() => {
    if (typingIndex < text.length) {
      setTypingContent(prevContent => prevContent + text[typingIndex]);
      setTypingIndex(prevIndex => prevIndex + 1);
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
};*/

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput(''); // Clear the input after submission
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-output">
        {output.map((line, index) => (
          <div key={index}>
            {index === output.length - 1 ? (
              <span className="typing">{typingContent}</span>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command"
          className="terminal-input"
        />
      </form>
      <div className="social-icons">
        <a href="[GitHub Link]" className="icon" aria-label="GitHub">
          <i className="fab fa-github"></i>
        </a>
        <a href="[Instagram Link]" className="icon" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="[LinkedIn Link]" className="icon" aria-label="LinkedIn">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default Terminal;
