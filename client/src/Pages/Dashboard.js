import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/Todo/TodoList';
import { logoutUser, deleteAllTodos } from '../Services/api';
import { clearUser } from '../Store/userSlice';
import styled from 'styled-components';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user); // Get user email from redux store
  const url = useSelector((state) => state.user.picture); // Get user picture from redux store
  const dispatch = useDispatch(); // Dispatch actions using useDispatch hook
  const navigate = useNavigate(); // Navigate to different routes using useNavigate hook

  useEffect(() => {
    // If there is no user data in the redux store, redirect to the login page
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  // Function to handle delete all todos
  const handleDeleteAllTodos = async () => {
    try {
      await deleteAllTodos(); // Call API to delete all todos
      // Optionally, you can dispatch an action to update the UI
      // dispatch(clearTodos());  // If you have a store slice for todos
    } catch (error) {
      console.log('Error deleting all todos:', error);
    }
  };

  return (
    <Wrapper className="container mt-5 py-4">
      <div className="header d-flex align-items-center justify-content-between">
        {/* User info directly displayed */}
        <div className="user-info d-flex align-items-center">
          {url && (
            <img
              src={url}
              alt="User Avatar"
              className="avatar-img rounded-circle"
              width={50}
              height={50}
            />
          )}
          <h2 className="ms-3">{user ? `Welcome, ${user}` : 'Welcome!'}</h2>
        </div>

        <div className="actions d-flex align-items-center">
          {/* Logout Button */}
          <button className="btn btn-sm btn-danger ms-3" onClick={handleLogout}>
            Logout
          </button>

          {/* Delete All Todos Button */}
          <button
            className="btn btn-sm btn-warning ms-3"
            onClick={handleDeleteAllTodos}
          >
            Delete All Todos
          </button>
        </div>
      </div>

      <TodoList /> {/* Display the TodoList component */}
    </Wrapper>
  );
};

export default Dashboard;

// Styled Components
const Wrapper = styled.div`
  background-color: rgba(52, 52, 52, 0.12);
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;
