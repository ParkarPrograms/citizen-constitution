import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ChapterPage() {
  const { chapterId } = useParams();
  
  // Fetch or define chapter details, lessons, and games here
  const lessons = [
    { id: 1, name: "Lesson 1" },
    { id: 2, name: "Lesson 2" }
    // More lessons
  ];

  const games = [
    { id: 1, name: "Game 1" },
    { id: 2, name: "Game 2" }
    // More games
  ];

  return (
    <div>
      <h1>Chapter {chapterId}</h1>
      <h2>Lessons:</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>
            <Link to={`/chapter/${chapterId}/lesson/${lesson.id}`}>{lesson.name}</Link>
          </li>
        ))}
      </ul>
      <h2>Games:</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <Link to={`/chapter/${chapterId}/game/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterPage;
