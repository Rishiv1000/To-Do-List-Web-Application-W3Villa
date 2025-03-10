import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiurl";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); 

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/v1/login`, {
        username: Data.username, 
        password: Data.password,
      });

      if (response.data.token) {
        localStorage.setItem("rajTM", response.data.token); 
        localStorage.setItem("id", response.data.userId); 
        navigate("/"); 
      } else {
        console.error("Login failed: ", response.data.message);
        setError("Login failed. Please try again."); 
        setShowAlert(true); 
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setError("An error occurred during login. Please try again."); 
      setShowAlert(true); 
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 via-green-400 to-green-600">

      <h1 className="text-4xl font-bold text-white mb-10">TO-DO LIST</h1>

     
      {showAlert && (
        <div
          className="fixed top-0 left-1/2 transform -translate-x-1/2 w-96 p-4 bg-red-600 text-white text-center font-semibold z-50 shadow-lg rounded-lg opacity-90 transition-all duration-500 ease-in-out"
          style={{
            top: showAlert ? "10px" : "-50px",
            opacity: showAlert ? "1" : "0",
          }}
        >
          {error}
        </div>
      )}

      <div className="p-10 w-96 rounded-xl bg-white shadow-2xl">
        <div className="text-3xl font-semibold text-gray-800 text-center mb-8">Sign In</div>

      
        <input
          autoComplete="off"
          type="text"
          placeholder="Username"
          name="username"
          className="bg-gray-100 text-gray-800 px-6 py-3 my-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-lg"
          onChange={change}
          value={Data.username}
        />
        <input
          autoComplete="off"
          type="password"
          placeholder="Password"
          name="password"
          className="bg-gray-100 text-gray-800 px-6 py-3 my-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-lg"
          onChange={change}
          value={Data.password}
        />

   
        <div className="w-full flex items-center justify-between mt-8">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold text-white px-8 py-3 rounded-lg transition duration-300 w-full"
            onClick={handleLogin} 
          >
            Login
          </button>
        </div>

      
        <div className="mt-8 text-center">
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            Don't have an account? Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
