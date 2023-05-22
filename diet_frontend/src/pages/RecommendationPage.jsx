import React from 'react';
import { useLocation } from 'react-router-dom';

const RecommendationsPage = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <h1>Recommendations Page</h1>
      <p>Here are your personalized diet recommendations:</p>
      <ul>
        <li>Height: {data.height}</li>
        <li>Weight: {data.weight}</li>
        <li>Age: {data.age}</li>
        <li>Gender: {data.gender}</li>
        <li>Preference: {data.preference}</li>
        <li>Activity Level: {data.activity_level}</li>
      </ul>
    </div>
  );
};

export default RecommendationsPage;
