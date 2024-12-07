import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./LogoutButton.css"

const LogoutButton = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      ⍈
    </button>
  );
};

export default LogoutButton;