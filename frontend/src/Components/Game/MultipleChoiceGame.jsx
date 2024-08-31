import React, { useState, useEffect } from 'react';

function MultipleChoiceGame({ gameId, onQuit }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Fetch or define questions based on gameId
    setQuestions([
      {
        id: 1,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
      },
      {
        id: 2,
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale",
      },
      // More questions
    ]);
  }, [gameId]);

  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedOption(null);
    } else {
      alert(`Game Over! Your final score is ${score + (selectedOption === currentQuestion.answer ? 1 : 0)} / ${questions.length}`);
      setCurrentQuestionIndex(0);
      onQuit();
    }
  };

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '20px 0' }}>
        {currentQuestion.options.map((option, index) => (
          <div key={index} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: selectedOption === option ? '#e0e0e0' : '#f9f9f9' }}>
            <label style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'block' }}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleAnswerSelection(option)}
                style={{ marginRight: '10px' }}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmitAnswer} disabled={selectedOption === null}>
        Submit
      </button>
      <p>Score: {score}</p>
      <button onClick={onQuit}>Quit</button>
    </div>
  );
}

export default MultipleChoiceGame;
