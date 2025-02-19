// src/components/TodoList.js

import React, { useState, useEffect } from 'react';
import api from '../apiurl';
import TodoItem from './ToDoItem';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const { data } = await api.get('/todos'); // Fetch all todos from the backend
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos when component mounts
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/todos', { text: newTodo }); // Add a new todo
      setTodos([...todos, data]); // Update state with new todo
      setNewTodo(''); // Clear input
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Handle input change
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
