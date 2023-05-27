import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { height, weight, bmi } = location.state;

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [preference, setPreference] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [objective, setObjective] = useState('maintain');
  const [formErrors, setFormErrors] = useState({});

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

  const handleObjectiveChange = (e) => {
    setObjective(e.target.value);
  };

  const validateForm = () => {
    const errors = {};

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

    if (!objective) {
      errors.objective = 'Objective is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        height: height,
        weight: weight,
        age: parseInt(age),
        gender,
        preference,
        activity_level: activityLevel,
        objective,
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/api/recipes/view/', {
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
          console.log(formData);
          //navigate('/recommendations', { state: formData });
          console.log('Error:', response.status);
        }
      } catch (error) {
        // Handle network or other errors
        console.log(formData);
        console.log('Error:', error.message);
      }
    }
  };

  const renderObjectiveField = () => {
    if (bmi > 24.9) {
      return (
        <div className="form-field">
          <label htmlFor="objective" className="label">
            Objective:
          </label>
          <select
            id="objective"
            className="select"
            value={objective}
            onChange={handleObjectiveChange}
          >
            <option value="">Select Objective</option>
            <option value="lose weight faster">Lose weight faster</option>
            <option value="lose weight medium rate">Lose weight medium rate</option>
            <option value="lose weight slowly">Lose weight slowly</option>
          </select>
          {formErrors.objective && (
            <span className="error">{formErrors.objective}</span>
          )}
        </div>
      );
    } else if (bmi < 18.5) {
      return (
        <div className="form-field">
          <label htmlFor="objective" className="label">
            Objective:
          </label>
          <select
            id="objective"
            className="select"
            value={objective}
            onChange={handleObjectiveChange}
          >
            <option value="">Select Objective</option>
            <option value="gain weight faster">Gain weight faster</option>
            <option value="gain weight medium rate">Gain weight medium rate</option>
            <option value="gain weight slowly">Gain weight slowly</option>
          </select>
          {formErrors.objective && (
            <span className="error">{formErrors.objective}</span>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  const getBmiMessage = () => {
    if (bmi > 24.9) {
      return `Your BMI is ${bmi}. It is above the optimal range. Consider losing weight. We can recommend some diets to help you.`;
    } else if (bmi < 18.5) {
      return `Your BMI is ${bmi}. It is below the optimal range. Consider gaining weight. We can recommend some diets to help you.`;
    } else {
      return `Your BMI is ${bmi}. It is within the optimal range. Would you like to see some diets to try out?`;
    }
  };

  return (
    
    <div className="getting-started-page">
        <div className={`card ${bmi > 24.9 ? 'red-card' : 'green-card'}`}>
  <div className="card-content">
    <h2 className="card-title">BMI: {bmi}</h2>
    <p className="card-message">{getBmiMessage()}</p>
  </div>
</div>
      <div className="form-description">
        <p className="description-text">
          Mind filling this form to give us more info to recommend you an optimised and balanced diet.
        </p>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
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
          {formErrors.gender && (
            <span className="error">{formErrors.gender}</span>
          )}
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
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
          {formErrors.preference && (
            <span className="error">{formErrors.preference}</span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="activity-level" className="label">
            Activity Level:
          </label>
          <select
            id="activity-level"
            className="select"
            value={activityLevel}
            onChange={handleActivityLevelChange}
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="lightly active">Lightly active (light exercise/sports 1-3 days per week)</option>
            <option value="moderately active">Moderately active (moderate exercise/sports 3-5 days per week)</option>
            <option value="very active">Very active (hard exercise/sports 6-7 days per week)</option>
            <option value="extra active">Super active (very hard exercise/sports & physical job or 2x training)</option>
          </select>
          {formErrors.activityLevel && (
            <span className="error">{formErrors.activityLevel}</span>
          )}
        </div>
        {renderObjectiveField()}
        <button type="submit" className="submit-button">
          Get Recommendations
        </button>
      </form>
    </div>
  );
};

export default ResultPage;
