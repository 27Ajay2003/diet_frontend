import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecommendationPage.css'; // Import CSS file for styling

const RecommendationsPage = () => {
  const location = useLocation();
  const dataf = location.state;
  console.log(dataf)
  const data = JSON.parse(dataf);
  const navigate = useNavigate();

  const [currentDietIndex, setCurrentDietIndex] = useState(0);

  const handleNextDiet = () => {
    setCurrentDietIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevDiet = () => {
    setCurrentDietIndex((prevIndex) => prevIndex - 1);
  };

  const handleShowRecipe = (recipeId) => {
    const selectedRecipe = data.find((row) => row.RecipeId === recipeId);
    if (selectedRecipe) {
      navigate(`/recipe/${recipeId}`, { state: selectedRecipe });
    }
  };

  const handleShowNutrition = () => {
    const startIndex = currentDietIndex * 5;
    const endIndex = startIndex + 5;
    const dietRows = data.slice(startIndex, endIndex);

    const nutritionalAnalysis = dietRows.reduce(
      (analysis, row) => {
        analysis.fat += row.FatContent;
        analysis.saturatedFat += row.SaturatedFatContent;
        analysis.cholesterol += row.CholesterolContent;
        analysis.sodium += row.SodiumContent;
        analysis.carbohydrates += row.CarbohydrateContent;
        analysis.fiber += row.FiberContent;
        analysis.sugar += row.SugarContent;
        analysis.protein += row.ProteinContent;
        analysis.calories+=row.Calories;
        // analysis.additionalNutrient += row.AdditionalNutrient;
        // Include other nutritional values as needed
        return analysis;
      },
      {
        fat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 0,
        fiber: 0,
        sugar: 0,
        protein: 0,
        calories: 0,
        // additionalNutrient: 0,
      }
    );

    navigate('/nutrition', { state: nutritionalAnalysis });
  };

  const renderMeals = () => {
    const startIndex = currentDietIndex * 5;
    const endIndex = startIndex + 5;
    const dietRows = data.slice(startIndex, endIndex);

    return dietRows.map((row) => (
      <div key={row.RecipeId} className="meal-card">
        {/* <h3>Recipe ID: {row.RecipeId}</h3> */}
        <h3>Name: {row.Name}</h3>
        <p>Calories: {row.Calories}</p>
        <div className="meal-details">
          <p>Fat Content: {row.FatContent}</p>
          <p>Saturated Fat Content: {row.SaturatedFatContent}</p>
          <p>Cholesterol Content: {row.CholesterolContent}</p>
          <p>Sodium Content: {row.SodiumContent}</p>
          <p>Carbohydrate Content: {row.CarbohydrateContent}</p>
          <p>Fiber Content: {row.FiberContent}</p>
          <p>Sugar Content: {row.SugarContent}</p>
          <p>Protein Content: {row.ProteinContent}</p>
          
        </div>
        <button
          className="show-recipe-button"
          onClick={() => handleShowRecipe(row.RecipeId)}
        >
          Show Recipe
        </button>
      </div>
    ));
  };

  const totalDiets = Math.ceil(data.length / 5);
  const isPrevDisabled = currentDietIndex === 0;
  const isNextDisabled = currentDietIndex === totalDiets - 1;
  return (
    <div className="card-wrapper">
      <div className="diet-card">
        <h1>Recommended Diets</h1>
        <div className="meal-container">{renderMeals()}</div>
      </div>
      <div className="pagination-buttons">
        <button
          className="prev-button"
          onClick={handlePrevDiet}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          className="next-button"
          onClick={handleNextDiet}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
      <button
        className="nutritional-analysis-button"
        onClick={handleShowNutrition}
      >
        Nutritional Analysis
      </button>
    </div>
  );
  
};

export default RecommendationsPage;
