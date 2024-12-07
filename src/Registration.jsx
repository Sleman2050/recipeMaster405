// Registration.js
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import { auth } from "./firebaseConfig"; 
import './Registration.css';
import { FaGoogle } from 'react-icons/fa'; 

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); 
  const navigate = useNavigate(); 

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/search");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/search");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/search");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registration-container" id="registration-container">
      <header className="registration-header" id="registration-header">
    
       
      </header>
      <h2 id="form-title">{isSignUp ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit} id="registration-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          id="email-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          id="password-input"
        />
        <button type="submit" className="submit-button" id="submit-button">{isSignUp ? "Sign Up" : "Log In"}</button>
      </form>
      {error && <p className="error-message" id="error-message">{error}</p>}
      
      <div className="toggle" id="toggle-container">
        <p id="toggle-text">{isSignUp ? "Already have an account?" : "Don't have an account?"}</p>
        <button onClick={() => setIsSignUp((prev) => !prev)} id="toggle-button">
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      </div>

      <button onClick={handleGoogleSignUp} className="google-signup-button" id="google-signup-button">
    <FaGoogle className="google-icon" />
    Sign Up with Google
</button>
    </div>
  );
};

export default Registration;