import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useUser } from '../context/UserContext';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    // Replace with actual registration logic
    if (name && email && password) {
        try {
            const response = await fetch('http://localhost:5000/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
              localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
              setUser(data.user);
              navigate('/chapters');
            } else {
              alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Register Here</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      <div className="mt-3">
        <p>Already have an account?</p>
        <Button variant="link">
          <Link to="/login">Login Here!</Link>
        </Button>
      </div>
    </Container>
  );
}

export default RegisterPage;
