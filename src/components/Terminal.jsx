import React, { useState, useEffect } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  
  useEffect(() => {
    // Example: Automatically print a welcome message
    setOutput(["Welcome to the Kshitij Terminal. Type 'help' for available commands."]);
  }, []);

  const getRandomPhoto = () => {
    // Load all images from the folder
    const photos = require.context('../assets/photos', false, /\.(png|jpe?g|svg)$/);
    const keys = photos.keys(); // Get all image paths
    const randomIndex = Math.floor(Math.random() * keys.length); // Pick a random index
    return photos(keys[randomIndex]).default; // Return the image path
  };
  

  const handleCommand = (command) => {
    let newOutput = [`> ${command}`];

    if (command === 'about') {
      const randomPhoto = getRandomPhoto(); // Get a random photo
      newOutput.push(commandsData.commands[command]); // Push the about text
      newOutput.push(<img src={randomPhoto} alt="random" className="about-photo" />); // Add the photo to output
    }
    
    else if (command === 'projects') {
      const projectsList = commandsData.commands.projects.map((project, index) => (
        <div key={index}>
          <strong className="project-title">{project.name}</strong>
          <p className="project-description">{project.description}</p>
          <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <br />
        </div>
      ));
      newOutput = [...newOutput, ...projectsList];
    } 
    
    else if (command === 'about') {
      const randomPhoto = getRandomPhoto();
      newOutput.push(commandsData.commands[command]);
      newOutput.push(<img src={randomPhoto} alt="random" className="about-photo" />);
    } 
    
    else if (command === 'skills') {
      newOutput.push(commandsData.commands[command]);
    } 
    
    else if (command === 'contact') {
      const contactDetails = (
        <div className="contact-info">
          <p>GitHub: <a href={commandsData.commands.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p>LinkedIn: <a href={commandsData.commands.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p>Instagram: <a href={commandsData.commands.contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></p>
        </div>
      );
      newOutput.push(contactDetails);
    } 
    
    else if (command === 'help') {
      newOutput.push("Available commands: help, about, projects, skills, contact, easter-egg.");
    } 
    
    else if (command === 'easter-egg') {
      window.location.href = commandsData.commands.easter-egg.url;
    } 
    
    else {
      newOutput.push("Command not found. Type 'help' for a list of commands.");
    }

    setOutput(prevOutput => [...prevOutput, ...newOutput]);
  };

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
          <div key={index} className="output-line">{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command"
          className="terminal-input"
        />
      </form>
    </div>
  );
};

export default Terminal;
