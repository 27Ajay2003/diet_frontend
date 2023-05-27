import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import GettingStartedPage from './pages/GettingStartedPage';
import RecommendationsPage from './pages/RecommendationPage';
import RecipePage from './pages/RecipePage'; // Import the RecipePage component
import NutritionPage from './pages/NutritionPage';
import ResultPage from './pages/ResultPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Place your header component here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} /> {/* Add the route for the RecipePage */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
