import React, { useState, useEffect } from 'react';
import './Terminal.css';
const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the terminal whenever the output changes
    const terminalWindow = document.getElementById('terminal-window');
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
  }, [output]);

  const handleCommandInput = (e) => {
    setCommand(e.target.value);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();

    if (!command.trim()) return;

    setOutput((prevOutput) => [...prevOutput, { command }]);
    setCommand('');
    processCommand(command.trim().toLowerCase());
  };

  const processCommand = (cmd) => {
    switch (cmd) {
      case 'help':
        addOutput(
          "Available commands: 'help', 'about', 'projects', 'skills', 'contact', 'easter-egg'."
        );
        break;
      case 'hello':
        addOutput('Hello! 👋');
        break;
      case 'hi':
        addOutput('Hi there! 👋');
        break;
      case 'hey':
        addOutput('Hey! 👋');
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'about':
        addOutput(
          <div className="about-container">
            <img src="public/1.jpeg" alt="Random" className="about-photo" />
            <div className="about-text">
              <h2>About Me</h2>
              <p>
                I’m a software developer with a strong focus on building mobile and web applications. Skilled in Flutter,
                Python, JavaScript, and more, I thrive on turning complex ideas into functional, efficient, and user-friendly
                solutions. Let’s build something meaningful.
              </p>
            </div>
          </div>
        );
        break;
      case 'projects':
        addOutput(
          <div>
            <h2>Projects</h2>
            <ul>
              <li>
                <h3>Autotypers</h3>
                Developed autotypers in Python, Go, and C++ to automate repetitive typing tasks with high efficiency.
                <a href="https://github.com/Pr1s0n3r627/The-Typer" target="_blank"> Python</a>,
                <a href="GITHUB_LINK" target="_blank"> Golang</a>,
                <a href="https://github.com/Pr1s0n3r627/auto_typer_cpp" target="_blank"> C++ (Ongoing)</a>
              </li>
              <li>
                <h3>Portfolio Website</h3>
                This portfolio showcases my work as a software developer, from mobile apps to AI projects. I created this during my trip to my sister's house for Rakshabandhan, blending passion and creativity into each project.
                <a href="https://github.com/Pr1s0n3r627/website-building" target="_blank"> View on GitHub</a>
              </li>
              <li>
                <h3>Keylogger</h3>
                A personal project to understand how keyloggers work and to enhance my knowledge of cybersecurity. It also ran undetected by Bitdefender.
                <a href="https://github.com/Pr1s0n3r627/key-logger" target="_blank"> View on GitHub</a>
              </li>
            </ul>
            <h3>Ongoing Projects</h3>
            <ul>
              <li>
                <h3>Break the Cycle</h3>
                A minimalist Flutter app to track and break unhealthy habits, built with customized UI for each user.
                <a href="https://github.com/Pr1s0n3r627/flutter-breaking-habits-app" target="_blank"> View on GitHub</a>
              </li>
              <li>
                <h3>Crop Recommendation System</h3>
                A hackathon project on a crop recommendation system using AI. Led the team, designed the UI, and conducted research.
                <a href="https://github.com/Pr1s0n3r627/hackaccino---project" target="_blank"> View on GitHub</a>
              </li>
              <li>
                <h3>AI Song Recommender</h3>
                An AI system that recommends songs based on emotional analysis of lyrics using Python and Spotify API.
                <a href="https://github.com/Pr1s0n3r627/music-recommendation-using-machine-learning" target="_blank"> View on GitHub</a>
              </li>
              <li>
                <h3>Ultra-Ego Chatbot</h3>
                A sarcastic AI chatbot created for personal use, with a focus on NLP and personality-based responses.
              </li>
            </ul>
          </div>
        );
        break;
      case 'skills':
        addOutput(
          <div>
            <h2>Technical Skills</h2>
            <ul>
              <li><strong>Languages:</strong> Dart, Python, Java, C++, Go, Bash</li>
              <li><strong>Frameworks:</strong> Flutter, React</li>
              <li><strong>Tools:</strong> Git, Docker, Kubernetes</li>
              <li><strong>Specializations:</strong> App Development, AI, DevOps Automation, Website - frontend</li>
            </ul>
          </div>
        );
        break;
      case 'contact':
        addOutput(
          <div>
            <h2>Contact Me</h2>
            <p>Let’s connect on social media or collaborate on exciting projects!</p>
            <ul>
              <li><a href="https://github.com/Pr1s0n3r627" target="_blank">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/kshitij-sahdev-venv/" target="_blank">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/kshitijsahdev_/" target="_blank">Instagram</a></li>
            </ul>
            <p>Or reach me directly at <a href="mailto:kshitijsahdev5@gmail.com">kshitijsahdev5@gmail.com</a></p>
          </div>
        );
        break;
      case 'easter-egg':
        addOutput(
          <p>
            🎉 Congratulations! You found the Easter egg! 🎉
          </p>
        );
        break;
      default:
        addOutput(`Command not found: ${cmd}. Type 'help' for a list of commands.`);
    }
  };

  const addOutput = (content) => {
    setIsAnimating(true);
    setOutput((prevOutput) => [...prevOutput, { content }]);
    setIsAnimating(false);
  };

  return (
    <div className="terminal-container">
      <div id="terminal-window" className="terminal-window">
        {output.map((item, index) => (
          <div key={index} className="terminal-output">
            {item.command && <div className="terminal-command">{`> ${item.command}`}</div>}
            <div className="terminal-response">{item.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommandSubmit} className="terminal-input-form">
        <span className="terminal-prompt">{`> `}</span>
        <input
          type="text"
          value={command}
          onChange={handleCommandInput}
          className="terminal-input"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
