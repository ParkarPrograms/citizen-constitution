import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function NavBar() {
  const { user, setUser } = useUser(); // Access user data from context
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user context and localStorage
    setUser(null);
    navigate('/'); // Redirect to home page
  };

  return (
    <Navbar bg="gray" expand="lg" className="border border-4">
      <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {user && <Nav.Link as={Link} to="/chapters">Chapters</Nav.Link>}
        </Nav>
        <Nav className="ml-auto">
          {!user ? (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          ) : (
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
