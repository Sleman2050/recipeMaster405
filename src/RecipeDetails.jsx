import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import "./RecipeDetails.css";

const RecipeDetails = ({ recipe, onBack }) => {
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    const fetchNutrition = async () => {
      const API_KEY = "57f67b00279a4e218e02dafd8bfce273"; // Replace with your API key
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
        <p>
          <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
      </div>

      {nutrition && (
        <div className="recipe-nutrition">
          <h2>Nutrition Information</h2>
          <div className="nutrition-list">
            <p><strong>Calories:</strong> {nutrition.calories} kcal</p>
            <p><strong>Fat:</strong> {nutrition.fat}</p>
            <p><strong>Carbs:</strong> {nutrition.carbs}</p>
            <p><strong>Protein:</strong> {nutrition.protein}</p>
          </div>
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
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(recipe.instructions || "No instructions provided."),
          }}
        ></div>
      </div>
    </div>
  );
};

export default RecipeDetails;