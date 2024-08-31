import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LessonCarousel from '../Components/LessonCarousel';
import GameCarousel from '../Components/GameCarousel';

function LessonPage() {
  const { chapterId, lessonId } = useParams();
  const [content, setContent] = useState([
    {title: "ABCD", text: "lorem ipsum dolor sit amet"},
    {title: "EFGH", text: "lorem ipsum dolor sit amet"}
  ]);
  const [games, setGames] = useState([
    {id: 1, type: 'truefalse', name: 'True / False'},
    {id: 2, type: 'truefalse', name: 'Multi Choice'}
  ]);


  // useEffect(() => {
  //   // Fetch lesson details from backend
  //   const fetchLessonData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/chapter/${chapterId}/lesson/${lessonId}`);
  //       const data = await response.json();
  //       setContent(data.content);
  //       setGames(data.games);
  //     } catch (error) {
  //       console.error('Error fetching lesson data:', error);
  //     }
  //   };

  //   fetchLessonData();
  // }, [chapterId, lessonId]);

  return (
    <div className="d-flex flex-column h-100 justify-content-center">
      <p className="mb-0 text-center display-6">Lesson {lessonId} of Chapter {chapterId}</p>
      <div className="flex-grow-1 mx-4 my-2">
        <LessonCarousel lessonContent={content} />
      </div>
      <div className="flex-grow-1 mx-4 my-2">
        <GameCarousel games={games} />
      </div>
    </div>
  );
}

export default LessonPage;
