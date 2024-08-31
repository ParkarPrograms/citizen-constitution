import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ChapterPage() {
  const { chapterId } = useParams();
  // const [lessons, setLessons] = useState([]);
  // const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchChapterDetails = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`http://localhost:5000/chapter/${chapterId}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch chapter details');
  //       }
  //       const data = await response.json();
  //       setLessons(data.lessons);
  //       setGames(data.games);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchChapterDetails();
  // }, [chapterId]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

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
