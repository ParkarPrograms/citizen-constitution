import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ChaptersPage() {
  const { user } = useUser();
  // const [chapters, setChapters] = useState([]);

  // useEffect(() => {
  //   const fetchChapters = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/chapters');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch chapters');
  //       }
  //       const data = await response.json();
  //       setChapters(data.chapters);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

  //   fetchChapters();
  // }, []);

  // Example static data; replace with actual data fetching
  const chapters = [
    { id: 1, title: "Chapter 1: Introduction" },
    { id: 2, title: "Chapter 2: Basics" }
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
