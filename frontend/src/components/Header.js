// src/components/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <header>
      <h1>Todo App</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
