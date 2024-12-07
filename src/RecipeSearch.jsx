import React, { useState, useCallback } from "react";

import axios from "axios";
import "./RecipeSearch.css";
import RecipeDetails from "./RecipeDetails";
import FilterAndSort from "./FilterAndSort";
import { useNavigate } from 'react-router-dom';



const RecipeSearch = ({ darkMode }) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [sortBy, setSortBy] = useState("popularity");



  






  


  const fetchRecipes = useCallback(async () => {
    if (!query && !cuisine && !diet && !maxTime) return;

    const API_KEY = "4a2b9c29bc2c493b9de099c8526d7c1f";
    let URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=30`;

    if (query) URL += `&query=${query}`;
    if (cuisine) URL += `&cuisine=${cuisine}`;
    if (diet) URL += `&diet=${diet}`;
    if (maxTime) URL += `&maxReadyTime=${maxTime}`;
    if (sortBy) URL += `&sort=${sortBy}`;

    try {
      const response = await axios.get(URL);
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [query, cuisine, diet, maxTime, sortBy]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "cuisine") setCuisine(value);
    if (name === "diet") setDiet(value);
    if (name === "maxTime") setMaxTime(value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const fetchRecipeDetails = async (id) => {
    const API_KEY = "4a2b9c29bc2c493b9de099c8526d7c1f";
    const URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    try {
      const response = await axios.get(URL);
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleCardClick = (id) => {
    fetchRecipeDetails(id);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const resetFilters = () => {
    setCuisine("");
    setDiet("");
    setMaxTime("");
    setSortBy("popularity");
    setQuery("");
    setRecipes([]);
  };

  const handleSearch = () => {
    fetchRecipes();
  };

  return (
    <div className={`recipe-search ${darkMode ? "dark-mode" : ""}`}>
      {!selectedRecipe ? (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={handleInputChange}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          
      
           
          </div>

          <FilterAndSort
            cuisine={cuisine}
            diet={diet}
            maxTime={maxTime}
            sortBy={sortBy}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />

          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>

          <div className="recipe-grid">
            {recipes.length > 0
              ? recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="recipe-card"
                    onClick={() => handleCardClick(recipe.id)}
                  >
                    <h3>{recipe.title}</h3>
                    <img src={recipe.image} alt={recipe.title} />
                  </div>
                ))
              : query && (
                  <p className="noRecipesFound">
                    No recipes found. Try searching for something else.
                  </p>
                )}
          </div>
        </>
      ) : (
        <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />
      )}
    </div>
  );
};

export default RecipeSearch;

