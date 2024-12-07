import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import { getAuth } from "firebase/auth";
import RecipeSearch from "./RecipeSearch";
import RecipeDetails from "./RecipeDetails";
import Registration from "./Registration";
import { auth } from "./firebaseConfig";
import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "./LogoutButton";
import CulturalExploration from "./AiGameComponents/CulturalExploration";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in: ", user);
        setIsAuthenticated(true);
      } else {
        console.log("User is not logged in");
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); 
    
  }, []);

  return (
    <Router>
      <div className="header">
        <DarkModeToggle /> 
        
        <h1 className="mainH">Recipe Master</h1>
        {isAuthenticated && (
    <>
      <LogoutButton />
    
    </>
        )}
      </div>

      <Routes>
        <Route path="/login" element={<Registration />} />
        <Route

          path="/search"
          element={isAuthenticated ? <RecipeSearch /> : <Navigate to="/login" />}
        />

        <Route

          path="/cultural-exploration"
          element={isAuthenticated ? <CulturalExploration /> : <Navigate to="/login" />}
        />
        <Route
          path="/recipe/:id"
          element={isAuthenticated ? <RecipeDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/search" /> : <Navigate to="/login" />}

        />

      </Routes>

      
    </Router>
  );
};

export default App;


