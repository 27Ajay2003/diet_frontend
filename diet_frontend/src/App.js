import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import GettingStartedPage from './pages/GettingStartedPage'; // Import the GettingStartedPage component
import RecommendationsPage from './pages/RecommendationPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Place your header component here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} /> {/* Add the route for the Getting Started page */}
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
