import React, { useState, useEffect } from 'react';
import './Terminal.css'; // Make sure you have your CSS for styling

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Function to fetch a random photo
  const getRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex];
  };

  // Load photos from the folder when the component mounts
  useEffect(() => {
    // List your photo files here
    setPhotos([
      'public/1.jpeg',
      'public/2.jpeg',
      'public/3.jpeg',
      'public/4.jpeg',
      'public/5.jpeg',
      'public/6.jpeg',
      'public/7.jpeg'
      // Add more photos as needed
    ]);
  }, []);

  const handleCommand = (command) => {
    let newOutput = [];
    switch (command) {
      case 'help':
        newOutput.push('Available commands: help, about, projects, skills, contact, random-photo.');
        break;
      case 'about':
        newOutput.push(`I’m a software developer with a strong focus on building mobile and web applications. Skilled in Flutter, Python, JavaScript, and more, I thrive on turning complex ideas into functional, efficient, and user-friendly solutions. Let’s build something meaningful.\nHere's a random photo of me:\n<img src="${getRandomPhoto()}" alt="Random" class="photo" />`);
        break;
      case 'projects':
        newOutput.push(
          `1. Autotypers: Developed autotypers in Python, Go, and C++ to automate repetitive typing tasks. [Python](https://github.com/Pr1s0n3r627/The-Typer) [Golang](LINK_TO_GITHUB) [C++ (Ongoing)](https://github.com/Pr1s0n3r627/auto_typer_cpp)\n` +
          `2. Portfolio website: Showcases my work as a software developer. [View on GitHub](https://github.com/Pr1s0n3r627/website-building)\n` +
          `3. Keylogger: Personal project for learning about keyloggers and cybersecurity. [View on GitHub](https://github.com/Pr1s0n3r627/key-logger)\n` +
          `\nOngoing Projects:\n` +
          `1. Break the Cycle: A minimalist Flutter app to track and break unhealthy habits. [View on GitHub](https://github.com/Pr1s0n3r627/flutter-breaking-habits-app)\n` +
          `2. Crop Recommendation System: AI-based crop recommendation system. [View on GitHub](https://github.com/Pr1s0n3r627/hackaccino---project)\n` +
          `3. AI Song Recommender: AI system recommending songs based on emotional analysis. [View on GitHub](https://github.com/Pr1s0n3r627/music-recommendation-using-machine-learning)\n` +
          `4. Ultra-Ego Chatbot: Sarcastic AI chatbot with NLP-based responses.`
        );
        break;
      case 'skills':
        newOutput.push(`Technical Skills:\n` +
          `- Languages: Dart, Python, Java, C++, Go, Bash\n` +
          `- Frameworks: Flutter, React\n` +
          `- Tools: Git, Docker, Kubernetes\n` +
          `- Specializations: App Development, AI, DevOps Automation, Website - frontend`
        );
        break;
      case 'contact':
        newOutput.push(`Contact Me:\n` +
          `Let’s connect on social media or collaborate on exciting projects!\n` +
          `- [GitHub](https://github.com/Pr1s0n3r627)\n` +
          `- [LinkedIn](https://www.linkedin.com/in/kshitij-sahdev-venv/)\n` +
          `- [Instagram](https://www.instagram.com/kshitijsahdev_/)\n` +
          `\nOr reach me directly at [kshitijsahdev5@gmail.com](mailto:kshitijsahdev5@gmail.com)`
        );
        break;
      case 'random-photo':
        newOutput.push(`Here's a random photo of me:\n<img src="${getRandomPhoto()}" alt="Random" class="photo" />`);
        break;
      case 'easter-egg':
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        break;
      default:
        newOutput.push('Command not found.');
    }
    setOutput(prevOutput => [...prevOutput, `> ${command}`, ...newOutput]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput(''); // Clear the input after submission
    }
  };

  return (
    <div className="terminal">
      <div className="output">
        {output.map((line, index) => (
          <div key={index} className="line" dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command"
          className="input"
        />
      </form>
    </div>
  );
};

export default Terminal;
