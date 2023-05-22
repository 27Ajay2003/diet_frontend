import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GettingStartedPage.css';

const GettingStartedPage = () => {
  const navigate = useNavigate();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [preference, setPreference] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePreferenceChange = (e) => {
    setPreference(e.target.value);
  };


  const handleActivityLevelChange = (e) => {
    setActivityLevel(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!height) {
      errors.height = 'Height is required';
    }

    if (!weight) {
      errors.weight = 'Weight is required';
    }

    if (!age) {
      errors.age = 'Age is required';
    }

    if (!gender) {
      errors.gender = 'Gender is required';
    }

    if (!preference) {
        errors.preference = 'Preference is required';
      }

    if (!activityLevel) {
      errors.activityLevel = 'Activity level is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        height,
        weight,
        age,
        gender,
        preference,
        activity_level: activityLevel,
      };

      try {
        const response = await fetch('your_api_endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Handle successful response
          const data = await response.json();
          console.log('Response:', data);

          // Navigate to the recommendations page
          navigate('/recommendations', { state: data });
        } else {
          // Handle error response
          console.log(formData)
          navigate('/recommendations', { state: formData });
          console.log('Error:', response.status);
        }
      } catch (error) {
        // Handle network or other errors
        console.log(formData)
        console.log('Error:', error.message);
      }
    }
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
            Weight (kgs):
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
        <div className="form-field">
          <label htmlFor="age" className="label">
            Age:
          </label>
          <input
            type="text"
            id="age"
            className="input"
            value={age}
            onChange={handleAgeChange}
          />
          {formErrors.age && <span className="error">{formErrors.age}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="gender" className="label">
            Gender:
          </label>
          <select
            id="gender"
            className="select"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formErrors.gender && <span className="error">{formErrors.gender}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="preference" className="label">
            Preference:
          </label>
          <select
            id="preference"
            className="select"
            value={preference}
            onChange={handlePreferenceChange}
          >
            <option value="">Select Preference</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          {formErrors.preference && <span className="error">{formErrors.preference}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="activityLevel" className="label">
            Activity Level:
          </label>
          <select
            id="activityLevel"
            className="select"
            value={activityLevel}
            onChange={handleActivityLevelChange}
          >
            <option value="">Select Activity Level</option>
            <option value="very high">Very High</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="very low">Very Low</option>
          </select>
          {formErrors.activityLevel && (
            <span className="error">{formErrors.activityLevel}</span>
          )}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default GettingStartedPage;
