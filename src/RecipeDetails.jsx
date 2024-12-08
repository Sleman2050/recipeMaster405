import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import "./RecipeDetails.css";

const RecipeDetails = ({ recipe, onBack }) => {
  const [nutrition, setNutrition] = useState(null);
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

  useEffect(() => {
    const fetchNutrition = async () => {
      const API_KEY = "57f67b00279a4e218e02dafd8bfce273";
      const URL = `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${API_KEY}`;
      try {
        const response = await axios.get(URL);
        setNutrition(response.data);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };

    if (recipe?.id) {
      fetchNutrition();
    }
  }, [recipe]);

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
        <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </div>

      {nutrition && (
        <div className="recipe-nutrition">
          <h2>Nutrition Information</h2>
          <ul>
            <li><strong>Calories:</strong> {nutrition.calories} kcal</li>
            <li><strong>Fat:</strong> {nutrition.fat}</li>
            <li><strong>Carbs:</strong> {nutrition.carbs}</li>
            <li><strong>Protein:</strong> {nutrition.protein}</li>
          </ul>
        </div>
      )}

      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-instructions">
  <h2>Instructions</h2>
  {recipe.instructions ? (
    <div className="instructions-container">
      {recipe.instructions
        .split(/<\/?p>/) // Split on <p> and </p> tags
        .filter((step) => step.trim() !== "") // Remove empty strings
        .map((step, index) => (
          <div key={index} className="instruction-step">
            <div className="step-header">
              <span className="step-number">Step {index + 1}</span>
            </div>
            <p className="step-text">{step}</p>
          </div>
        ))}
    </div>
  ) : (
    <p>No instructions provided.</p>
  )}
</div>



      <div className="recipe-notes">
        <h2>Your Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here..."
          className="notes-textarea"
        />
        <button onClick={handleSaveNotes} className="save-notes-button">
          Save Notes
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
