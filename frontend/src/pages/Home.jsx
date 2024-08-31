import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Adjust import path as needed
import { Button } from 'react-bootstrap';

function Home() {
  const { user } = useUser(); // Access user data from context
  const navigate = useNavigate();

  const handleViewChapters = () => {
    navigate('/chapters'); // Navigate to chapters page
  };

  return (
    <div className="text-center mt-5">
      <h1>Welcome to the Citizen & Constitution App</h1>
      <p>Learn the constitution the fun way!</p>
      {user ? (
        <Button variant="primary" onClick={handleViewChapters}>
          View All Chapters
        </Button>
      ) : (
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Home;
