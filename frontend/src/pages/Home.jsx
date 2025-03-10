import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../apiurl";

const Home = () => {
  const navigate = useNavigate();


  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("rajTM") || !localStorage.getItem("id")) {
      navigate("/login");
    } else {
      fetchTodos(); 
    }
  }, [navigate]);


  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v2/todos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("rajTM")}`,
        },
      });
      setTodos(response.data); 
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

 
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        await axios.post(
          `${API_BASE_URL}/v2/todos`,
          { text: newTodo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("rajTM")}`,
            },
          }
        );
        setNewTodo(""); 
        fetchTodos(); 
      } catch (error) {
        console.error("Error adding todo: ", error.response ? error.response.data : error);
      }
    } else {
      alert("Please enter a valid task!");
    }
  };

 
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text); 
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (editText.trim()) {
      try {
        await axios.put(
          `${API_BASE_URL}/v2/todos/${editTodo._id}`,
          { text: editText },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("rajTM")}`,
            },
          }
        );
        setEditTodo(null); 
        setEditText(""); 
        fetchTodos(); 
      } catch (error) {
        console.error("Error updating todo: ", error.response ? error.response.data : error);
      }
    } else {
      alert("Please enter a valid task!");
    }
  };


  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/v2/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("rajTM")}`,
        },
      });
      console.log("Delete successful:", response.data);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo: ", error.response ? error.response.data : error.message);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("rajTM");
    localStorage.removeItem("id");
    navigate("/login"); 
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 via-green-400 to-green-600">

      <div className="text-white text-center text-3xl mb-6">To-Do App</div>
      <div className="mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

     
      <form onSubmit={handleAddTodo} className="mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
          className="p-2 rounded-lg w-72 mt-2 text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 ml-2 rounded"
        >
          Add
        </button>
      </form>

    
      <ul className="space-y-4 w-72">
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
            {editTodo?._id === todo._id ? (
              <form onSubmit={handleUpdateTodo} className="flex space-x-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="p-2 rounded-lg w-48 border-2 text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              </form>
            ) : (
              <>
                <span className="text-white flex-grow">{todo.text}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
