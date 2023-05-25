import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/getting-started'); // Navigate to the Getting Started page
  };

  return (
    <div className="home-page">
      <div className="home-page-background"></div>
      <div className="home-page-content">
        <h1 className="welcome-text">Welcome to Diet Recommendation</h1>
        <p className="site-description">Start your journey towards a healthier lifestyle.</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
