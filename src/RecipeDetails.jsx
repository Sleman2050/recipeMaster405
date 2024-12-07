import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";

const RecipeDetails = ({ recipe, onBack }) => {
  const [notes, setNotes] = useState(""); 

  useEffect(() => {
    
    const savedNotes = localStorage.getItem(`notes-${recipe.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [recipe]);

  const handleSaveNotes = () => {
  
    localStorage.setItem(`notes-${recipe.id}`, notes);
    alert("Notes saved!");
  };

  return (
    <div className="recipe-details">
      <button onClick={onBack} className="back-button">
        ← Back
      </button>
      <div className="recipe-header">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <h1 className="recipe-title">{recipe.title}</h1>
      </div>
      <div className="recipe-meta">
        <p>
          <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
      </div>

      <div className="recipe-notes">
        <h2>Your Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here..."
          style={{ width: "100%", height: "100px" }}
        ></textarea>
        <button onClick={handleSaveNotes} style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
          Save Notes
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
