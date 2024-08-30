import React from 'react';
import { useParams } from 'react-router-dom';
import LessonContent from '../Components/Lesson/LessonContent';

function LessonPage() {
  const { chapterId, lessonId } = useParams();
  
  // Fetch or define lesson details here
  return (
    <div>
      <h1>Lesson {lessonId} in Chapter {chapterId}</h1>
      <LessonContent lessonId={lessonId} />
    </div>
  );
};

export default LessonPage;
