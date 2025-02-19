// src/components/TodoItem.js

import React, { useState } from 'react';
import api from '../apiurl';

const TodoItem = ({ todo, fetchTodos }) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo._id}`); // Delete todo
      fetchTodos(); // Refresh todo list
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCompleted = async () => {
    try {
      await api.put(`/todos/${todo._id}`, { isCompleted: !isCompleted }); // Toggle completion
      setIsCompleted(!isCompleted); // Update local state
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li>
      <span
        style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
        onClick={handleToggleCompleted} // Toggle completion on click
      >
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
