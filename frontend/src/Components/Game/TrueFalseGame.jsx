import React, { useState, useEffect } from 'react';

function TrueFalseGame({ gameId, onQuit }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch or define questions based on gameId
    setQuestions([
      { id: 1, question: "The Earth is flat.", answer: false },
      { id: 2, question: "The sky is blue during the day.", answer: true },
      // More questions
    ]);
  }, [gameId]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      alert(`Game Over! Your final score is ${score + (answer === currentQuestion.answer)} / ${questions.length}`);
      setCurrentQuestionIndex(0);
      onQuit()
    }
  };

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <button onClick={() => handleAnswer(true)}>True</button>
      <button onClick={() => handleAnswer(false)}>False</button>
      <p>Score: {score}</p>
      <button onClick={onQuit}>Quit</button>
    </div>
  );
};

export default TrueFalseGame;
