import React, { useState } from "react";
import "./App.css";

function App() {
  const [answers, setAnswers] = useState({});

  const handleAnswer = (question, value) => {
    setAnswers(prev => {
      const updated = { ...prev, [question]: value };
      if (updated.q1 && updated.q2 && updated.q3) {
        const formData = new FormData();
        formData.append("q1", updated.q1);
        formData.append("q2", updated.q2);
        formData.append("q3", updated.q3);

        fetch("https://script.google.com/macros/s/AKfycby1Cmij6fciRFpUYKbuhZ032Ea9za8TPY-4QpQQYTgNI9t-mq9i42WSGFsC7P1FVNDD/exec", {
          method: "POST",
          mode: "no-cors",
          body: formData
        });

        alert("Thanks! Your answers were submitted.");
        return {}; // Reset
      }
      return updated;
    });
  };

  return (
    <div className="App">
      <h1>Quick Survey</h1>
      <Question label="1. How are you feeling today!!!!?" name="q1" options={["Good", "Okay", "Bad"]} onSelect={handleAnswer} />
      <Question label="2. Did you eat breakfast?" name="q2" options={["Yes", "No"]} onSelect={handleAnswer} />
      <Question label="3. Ready to start the day?" name="q3" options={["Absolutely", "Not yet"]} onSelect={handleAnswer} />
    </div>
  );
}

function Question({ label, name, options, onSelect }) {
  return (
    <div className="question">
      <p>{label}</p>
      {options.map(option => (
        <button key={option} onClick={() => onSelect(name, option)}>{option}</button>
      ))}
    </div>
  );
}

export default App;
