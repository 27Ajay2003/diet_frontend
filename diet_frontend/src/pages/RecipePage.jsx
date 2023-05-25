import './RecipePage.css'; // Import CSS file for styling
import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipePage = () => {
  const location = useLocation();
  const recipe = location.state;
  console.log(recipe)

  const processString_instr = (str) => {
    const cleanedString = str.replace(/\\/g, '').replace(/"/g, '');
    const array = cleanedString.replace(/^c\(|\)$/g, '').split(',').map((item) => item.trim());
    const filteredArray = array.filter((item) => item !== "");
    const finalArray = filteredArray.map((item) => {
      const trimmedItem = item.replace(/[^A-Za-z0-9\s]/g, "").trim();
      return trimmedItem.charAt(0).toUpperCase() + trimmedItem.slice(1);
    });
    return finalArray;
  };

  const processString = (str) => {
    const cleanedString = str.replace(/\\/g, '').replace(/"/g, '');
    const array = cleanedString.replace(/^c\(|\)$/g, '').split(',').map((item) => item.trim());
    const finalArray = array.map((item) => {
      const trimmedItem = item.replace(/[^A-Za-z0-9\s]/g, "").trim();
      return trimmedItem.charAt(0).toUpperCase() + trimmedItem.slice(1);
    });
    return finalArray
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const ingredients = processString(recipe.RecipeIngredientParts);
  const instructions = processString_instr(recipe.RecipeInstructions);

  return (
    <div className="recipe-card">
      <div className="card-content">
        <h1 className="recipe-name">{recipe.Name}</h1>
        <div className="time-container">
          <p>Prep Time: {formatTime(recipe.PrepTime)}</p>
          <p>Cook Time: {formatTime(recipe.CookTime)}</p>
          <p>Total Time: {formatTime(recipe.TotalTime)}</p>
        </div>
        <h2 className="maintitle">Ingredients:</h2>
        <ul className="ingredient-list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className="maintitle">Instructions:</h2>
        <ol className="instruction-list">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
