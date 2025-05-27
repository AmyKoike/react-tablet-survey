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
        label="1. ロボットとの対話体験はどうでしたか？"
        name="q1"
        options={["非常に不快だった", "不快だった", "ふつう", "快適だった", "非常に快適だった"]}
        onSelect={handleAnswer}
        selected={selected}
      />
      <Question
        label="2. ロボットの声の音量はいかがでしたか？"
        name="q2"
        options={["非常に聞こえにくかった", "少し聞こえにくかった", "ちょうどよかった", "少しうるさかった", "非常にうるさかった"]}
        onSelect={handleAnswer}
        selected={selected}
      />
      <Question
        label="3. ロボットの声の速さはいかがでしたか？"
        name="q3"
        options={["非常に速すぎた", "速かった", "ちょうどよかった", "遅かった", "非常に遅かった"]}
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
