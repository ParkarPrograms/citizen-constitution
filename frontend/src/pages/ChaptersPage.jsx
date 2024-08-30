import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ChaptersPage() {
  const { user } = useUser();

  // Example static data; replace with actual data fetching
  const chapters = [
    { id: 1, title: "Chapter 1: Introduction" },
    { id: 2, title: "Chapter 2: Basics" }
    // More chapters here
  ];

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h4>All Chapters</h4>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>
            <Link to={`/chapter/${chapter.id}`}>{chapter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChaptersPage;
