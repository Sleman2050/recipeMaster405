import React from "react";
import "./TheResultCulturalDish.css";

function TheResultCulturalDish({ result }) {
  if (!result) {
    return (
      <div className="resultContainer">
        <p className="ifNoInput">Submit countries to see the fusion dish!</p>
      </div>
    );
  }

  const dishNameMatch = result.match(/%%(.*?)%%/);
  const dishName = dishNameMatch ? dishNameMatch[1] : "Fusion Dish";

  const ingredientsMatch = result.match(/Ingredients:(.*?)Steps:/s);
  const ingredients = ingredientsMatch
    ? ingredientsMatch[1]
        .trim()
        .split("\n")
        .map((item) => item.replace("-", "").trim())
        .filter((ingredient) => ingredient !== "") 
    : ["No ingredients provided"];

  const stepsMatch = result.match(/Steps:(.*?)Calories:/s);
  const steps = stepsMatch
    ? stepsMatch[1]
        .trim()
        .split("\n")
        .map((step) => step.replace(/^\d+\.\s*/, "").trim())
        .filter((step) => step !== "") 
    : ["No steps provided"];

  const caloriesMatch = result.match(/Calories:(.*?)Historical\/Cultural Relationship:/s);
  const calories = caloriesMatch ? caloriesMatch[1].trim() : "No calorie information provided";

  const relationshipMatch = result.match(/Historical\/Cultural Relationship:(.*)/s);
  const relationship = relationshipMatch
    ? relationshipMatch[1].trim()
    : "No historical or cultural information provided";

  return (
    <div className="resultContainer">
      <h2 className="dishName">{dishName}</h2>

      <div className="ingredientsSection">
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="stepsSection">
        <h3>Steps:</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="caloriesSection">
        <h3>Calories:</h3>
        <p>{calories}</p>
      </div>

      <div className="relationshipSection">
        <h3>Historical/Cultural Relationship:</h3>
        <p>{relationship}</p>
      </div>
    </div>
  );
}

export default TheResultCulturalDish;
