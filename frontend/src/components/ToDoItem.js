
import React, { useState } from 'react';
import api from '../apiurl';

const TodoItem = ({ todo, fetchTodos }) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      fetchTodos(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCompleted = async () => {
    try {
      await api.put(`/todos/${todo._id}`, { isCompleted: !isCompleted }); 
      setIsCompleted(!isCompleted); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li>
      <span
        style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
        onClick={handleToggleCompleted} 
      >
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
