import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { registerUser } from "../Services/api";

const Register = () => {
  const [email, setEmail] = useState(""); // State to hold the email address
  const [password, setPassword] = useState(""); // State to hold the password
  const [firstname, setFirstname] = useState(""); // State to hold the firstname
  const [lastname, setLastname] = useState(""); // State to hold the lastname
  const [pictureUrl, setPictureUrl] = useState(""); // State to hold the pictureUrl
  const navigate = useNavigate(); // Navigate hook to redirect the user
  const dispatch = useDispatch(); // Dispatch hook to dispatch actions
  const user = useSelector((state) => state.user.user); // get user email from redux store to check if user already logged in or not
  const token = useSelector((state) => state.user.token); // get user token from redux store to check if user already logged in or not

  useEffect(() => {
    // If there is user data in the redux store, redirect to the dashboard
    if (user && token) {
      navigate("/");
    }
  }, [user, token]);

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    try {
      // Call the registerUser function from the API module to send the register request
      const response = await registerUser({ first_name: firstname, last_name: lastname, email, password, pictureUrl });
      // Set the user in the redux store
      dispatch(setUser(response.email));
      // Set the token in the redux store
      dispatch(setToken(response.token));
      // Set the picture in the redux store
      dispatch(setPicture(response.picture));
      // Set the user id in the redux store
      dispatch(setUserId(response._id));
      navigate("/");
    } catch (error) {
      console.log("Error registering in:", error);
    }
  };

  return (
    <Wrapper className="d-flex align-items-center justify-content-center mt-5">
      <GlassMorphism className="col-10 col-md-8 col-lg-6 p-4">
        <h1 className="display-6 text-center mb-4">Create an Account</h1>
        <p className="text-sm text-center mb-4 text-muted">Join us and start getting things done!</p>
        <form className="py-3" onSubmit={handleSubmit}>
          

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputFirstname" className="form-label">Firstname</label>
              <input
                type="text"
                className="form-control"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                id="inputFirstname"
                placeholder="Enter your first name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLastname" className="form-label">Lastname</label>
              <input
                type="text"
                className="form-control"
                id="inputLastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 mt-3">Sign Up</button>

          <p className="text-sm mt-2 mb-0 text-center">
            Already have an account? <strong className="text-decoration-underline cursor-pointer" onClick={() => navigate('/login')}>Sign In</strong>
          </p>
        </form>
      </GlassMorphism>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  min-height: 100vh;
  // background: linear-gradient(120deg, #a6c0fe, #f68084); /* Soft gradient background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlassMorphism = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

