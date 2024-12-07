import React, { useState } from "react";
import TheResultCulturalDish from "./TheResultCulturalDish";
import InputFormUser from "./Inputfromuser";
import { OpenAI } from "openai";

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true// Ensure this is set correctly in your .env file
});

// Function to interact with OpenAI API
const getDataFromOpenAI = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Specify the model
      messages: [
        {
          role: "system",
          content: `You are a world-class chef. Your task is to generate a well-structured recipe with no empty fields. Each section should be concise and complete.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    throw error;
  }
};

function CulturalExploration() {
  const [fusionDish, setFusionDish] = useState("");

  const generateFusionDish = async (country1, country2) => {
    const prompt = `Create a fusion dish that combines the cuisines of ${country1} and ${country2}.
    The response must include:
    - Dish Name: Wrap the dish name in %%double percent signs%%.
    - Ingredients: List all ingredients needed for the dish (maximum of 10 items).
    - Steps: Provide a clear, step-by-step guide to prepare the dish (maximum of 7 steps).
    - Calories: Provide an approximate calorie count for one serving of the dish.
    - Historical/Cultural Relationship: Summarize a historical, cultural, or economic relationship between ${country1} and ${country2}.
    
    Ensure no section is left incomplete or empty.`;

    try {
      const generatedDish = await getDataFromOpenAI(prompt);
      console.log("Dish:", generatedDish);
      setFusionDish(generatedDish);
    } catch (error) {
      console.error("Failed to generate fusion dish:", error);
    }
  };

  const handleInfoSent = (country1, country2) => {
    generateFusionDish(country1, country2);
  };

  return (
    <div>
      <h1
        style={{
          fontFamily: "Roboto, sans-serif",
          color: "#008080",
          backgroundColor: "transparent",
          padding: "10px 0",
          textAlign: "center",
          transition: "color 0.3s",
        }}
      >
        Cultural Exploration: Discover Fusion Dishes
      </h1>
      <InputFormUser infoSent={handleInfoSent} />
      <TheResultCulturalDish result={fusionDish} />
    </div>
  );
}

export default CulturalExploration;
