import React, { useState } from 'react';
import RandomQuestion from './components/RandomQuestion';
import FeedbackForm from './components/FeedbackForm';
import 'animate.css'
import './App.css';

const App = () => {
  const [currentTopic, setCurrentTopic] = useState("");

  return (
    <div className="container">
      <header className='animate__animated animate__slideInDown'>
        <h1>Skriftlig assistent</h1>
      </header>
      <section className="question-section animate__animated animate__slideInLeft">
        <RandomQuestion 
          currentTopic={currentTopic} 
          setCurrentTopic={setCurrentTopic} 
        />
      </section>
      <section className="feedback-section animate__animated animate__slideInRight">
        <FeedbackForm 
          currentTopic={currentTopic} 
          setCurrentTopic={setCurrentTopic}
        />
      </section>
    </div>
  );
};

export default App;
