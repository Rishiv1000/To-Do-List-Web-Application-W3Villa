import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Skip redirect to signup if we're already on /login page
    if (!window.location.pathname.includes('/login')) {
      if (localStorage.getItem("id") && localStorage.getItem("token")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/signup"); // Redirect to signup if not logged in
      }
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        {/* Protected route for Home page */}
        {isLoggedIn && <Route path="/" element={<Home />} />}
        
        {/* Unprotected routes for signup and login */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App; 