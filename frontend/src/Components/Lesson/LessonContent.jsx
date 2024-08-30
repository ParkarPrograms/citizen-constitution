import React from 'react';

function LessonContent({ lessonId }) {
  // Fetch or define lesson content based on lessonId
  return (
    <div>
      <h2>Content for Lesson {lessonId}</h2>
      {/* Render lesson content here */}
    </div>
  );
};

export default LessonContent;
