import React, { useState } from "react";
import "./App.css";

function App() {
  const [selected, setSelected] = useState({});
  const [answers, setAnswers] = useState({});


  const handleAnswer = (question, value) => {
    const updated = { ...answers, [question]: value };
    setAnswers(updated);
    setSelected(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("q1", answers.q1);
    formData.append("q2", answers.q2);
    formData.append("q3", answers.q3);
  
    fetch("https://script.google.com/macros/s/AKfycby1Cmij6fciRFpUYKbuhZ032Ea9za8TPY-4QpQQYTgNI9t-mq9i42WSGFsC7P1FVNDD/exec", {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
  
    alert("Thanks! Your answers were submitted.");
    setAnswers({});
    setSelected({});
  };

  return (
    <><div className="App">
      <h1>ロボット体験のアンケート</h1>
      <Question
        label="1. ロボットの声の聞き取りやすさはどうでしたか？"
        name="q1"
        options={["全然聞こえなかった", "少し聞こえなかった", "どちらでもない", "聞き取りやすかった", "とても聞き取りやすかった"]}
        onSelect={handleAnswer}
        selected={selected}
      />
      <Question
        label="2. ロボットとの対話は快適でしたか？"
        name="q2"
        options={["全然快適でなかった", "快適でなかった", "どちらでもない", "快適だった", "とても快適だった"]}
        onSelect={handleAnswer}
        selected={selected}
      />
      <Question
        label="3. 友達にもこのロボットを使ってもらいたいですか？"
        name="q3"
        options={["全然そう思わない", "そう思わない", "どちらでもない", "そう思う", "とてもそう思う"]}
        onSelect={handleAnswer}
        selected={selected}
      />
      <div className="submit-container">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!answers.q1 || !answers.q2 || !answers.q3}
        >
          回答を送信
        </button>
      </div>
    </div></>
  );
}

function Question({ label, name, options, onSelect, selected }) {
  return (
    <div className="question">
      <h2>{label}</h2>
      <div className="button-group">
        {options.map((option, index) => {
          const isSelected = selected[name] === option;
          return (
            <button
              key={option}
              className={isSelected ? "circle selected" : "circle"}
              onClick={() => onSelect(name, option)}
              style={{
                background: `linear-gradient(135deg, hsl(${index * 40}, 80%, 60%), hsl(${index * 40 + 20}, 70%, 50%))`
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
