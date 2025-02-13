import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/Todo/TodoList';
import { logoutUser } from '../Services/api';
import { clearUser } from '../Store/userSlice';
import styled from 'styled-components';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user); // get user email from redux store
  const url = useSelector((state) => state.user.picture); // get user picture from redux store
  const dispatch = useDispatch(); // dispatch actions using useDispatch hook
  const navigate = useNavigate(); // navigate to different routes using useNavigate hook

  useEffect(() => {
    // If there is no user data in the redux store, redirect to the login page
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Call the logoutUser function from the API module to send the logout request
      await logoutUser(); // not in use yet
      // Clear user data in the redux store
      dispatch(clearUser());
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <Wrapper className="container mt-5 py-4">
      <div className="header d-flex align-items-center justify-content-between">
        {/* <div className="user-info d-flex align-items-center">
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
        </div> */}
        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <TodoList /> {/* Display the TodoList component */}
    </Wrapper>
  );
};

export default Dashboard;

// Styled Components


const Wrapper = styled.div`
  background-color:rgba(52, 52, 52, 0.12);
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

