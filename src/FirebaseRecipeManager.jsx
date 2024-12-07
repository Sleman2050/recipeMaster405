import React from "react";
import { ref, get, set, update } from "firebase/database";
import { db } from "./firebaseConfig"; // Ensure this is properly configured

const FirebaseRecipeManager = () => {
  const addOrUpdateRecipe = async () => {
    const recipeId = "648883"; // Unique Recipe ID
    const recipeRef = ref(db, `recipes/${recipeId}`);

    try {
      // Check if the recipe already exists
      const recipeSnapshot = await get(recipeRef);
      let existingData = recipeSnapshot.exists() ? recipeSnapshot.val() : {};

      // Update data if exists, or initialize
      const newData = {
        ...existingData,
        averageRating: existingData.averageRating || 0,
        ingredients: existingData.ingredients || "1 cup sugar, 2 cups flour",
        ratings: {
          ...existingData.ratings,
          user123: 5, // Example user rating
        },
        title: existingData.title || "Chocolate Cake",
      };

      // Recalculate average rating
      const ratingsArray = Object.values(newData.ratings || {});
      newData.averageRating =
        ratingsArray.reduce((sum, rating) => sum + rating, 0) /
        ratingsArray.length;

      // Update or create recipe
      await set(recipeRef, newData);

      console.log("Recipe successfully added/updated:", newData);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div>
      <button onClick={addOrUpdateRecipe}>Add/Update Recipe</button>
    </div>
  );
};

export default FirebaseRecipeManager;
