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
  const [objective, setObjective] = useState('');

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

  const handleObjectiveChange = (e) => {
    setObjective(e.target.value);
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
        height,
        weight,
        age,
        gender,
        preference,
        activity_level: activityLevel,
        objective
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
          console.log(formData)
          //navigate('/recommendations', { state: formData });
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
            <option value="extra active">Extra active</option>
            <option value="very active">Very active</option>
            <option value="moderately active">Moderately active</option>
            <option value="lightly active">Lightly active</option>
            <option value="sedentary">Sedentary</option>
          </select>
          {formErrors.activityLevel && (
            <span className="error">{formErrors.activityLevel}</span>
          )}
        </div>
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
            <option value="maintain">Maintain Weight</option>
            <option value="lose weight faster">Lose weight faster</option>
            <option value="lose weight medium rate">Lose weight medium rate</option>
            <option value="lose weight slowly">Lose weight slowly</option>

          </select>
          {formErrors.objective && (
            <span className="error">{formErrors.objective}</span>
          )}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default GettingStartedPage;
