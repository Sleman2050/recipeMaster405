import React from "react";
import "./FilterAndSort.css";

const FilterAndSort = ({ cuisine, diet, maxTime, sortBy, onFilterChange, onSortChange }) => {
  return (
    <div className="filters">
      <select name="cuisine" value={cuisine} onChange={onFilterChange}>
        <option value="">Select Cuisine</option>
        <option value="Italian">Italian</option>
        <option value="Mexican">Mexican</option>
        <option value="Asian">Asian</option>
        <option value="American">American</option>
        <option value="Indian">Indian</option>
        <option value="Mediterranean">Mediterranean</option>
        <option value="French">French</option>
        <option value="Middle Eastern">Middle Eastern</option>
      </select>

      <select name="diet" value={diet} onChange={onFilterChange}>
        <option value="">Select Diet</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten free">Gluten Free</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="paleo">Paleo</option>
        <option value="dairy free">Dairy Free</option>
        <option value="low carb">Low Carb</option>
      </select>

      <select name="maxTime" value={maxTime} onChange={onFilterChange}>
        <option value="">Max Time (in minutes)</option>
        <option value="30">30 min</option>
        <option value="60">60 min</option>
        <option value="90">90 min</option>
        <option value="120">120 min</option>
        <option value="150">150 min</option>
      </select>

      <div className="sorting">
        <select value={sortBy} onChange={onSortChange}>
          <option value="popularity">Sort by Popularity</option>
          <option value="readyInMinutes">Sort by Preparation Time</option>
          <option value="healthScore">Sort by Health Score</option>
          <option value="pricePerServing">Sort by Price Per Serving</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSort;
