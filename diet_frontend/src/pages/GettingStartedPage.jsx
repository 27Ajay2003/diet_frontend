import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GettingStartedPage.css';

const GettingStartedPage = () => {
  const navigate = useNavigate();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!height) {
      errors.height = 'Height is required';
    } else if (parseFloat(height) <= 0) {
      errors.height = 'Height must be a positive value';
    }

    if (!weight) {
      errors.weight = 'Weight is required';
    } else if (parseFloat(weight) <= 0) {
      errors.weight = 'Weight must be a positive value';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const bmi = calculateBMI(weight, height);

      // Navigate to the result page with the obtained data
      navigate('/result', { state: { height, weight, bmi } });
    }
  };

  const calculateBMI = (weight, height) => {
    const heightM = parseFloat(height) / 100; // Convert height from cm to m
    const bmiValue = parseFloat(weight) / (heightM ** 2);
    return bmiValue.toFixed(2); // Set BMI value with 2 decimal places
  };

  return (
    <div className="getting-started-page">
      <h1 className="page-title">Fuel Your Health</h1>
      <div className="form-description">
        <p className="description-text">
          Let's get started by providing a few details about yourself.
        </p>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="height" className="label">
            Height (cm):
          </label>
          <input
            type="text"
            id="height"
            className="input"
            value={height}
            onChange={handleHeightChange}
          />
          {formErrors.height && <span className="error">{formErrors.height}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="weight" className="label">
            Weight (kg):
          </label>
          <input
            type="text"
            id="weight"
            className="input"
            value={weight}
            onChange={handleWeightChange}
          />
          {formErrors.weight && <span className="error">{formErrors.weight}</span>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default GettingStartedPage;
