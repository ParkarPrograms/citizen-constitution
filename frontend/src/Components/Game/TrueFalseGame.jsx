import React, { useState, useEffect } from 'react';

function TrueFalseGame({ chapterId, gameId }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch or define questions based on chapterId and gameId
    setQuestions([
      { id: 1, question: "The Earth is flat.", answer: false },
      { id: 2, question: "The sky is blue during the day.", answer: true },
      // More questions
    ]);
  }, [chapterId, gameId]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    console.log(answer, currentQuestion.answer);
    if (answer === currentQuestion.answer) {
      console.log("Here");
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      alert(`Game Over! Your final score is ${score + (answer === currentQuestion.answer)} / ${questions.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
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
    </div>
  );
};

export default TrueFalseGame;
