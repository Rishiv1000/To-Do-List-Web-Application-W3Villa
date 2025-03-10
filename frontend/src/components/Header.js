

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <header>
      <h1>Todo App</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
