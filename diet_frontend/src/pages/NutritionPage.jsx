

import React from 'react';
import './NutritionPage.css'; // Import CSS file for styling
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const NutritionPage = () => {
  const location = useLocation();
  const nutritionalAnalysis = location.state;
  console.log(nutritionalAnalysis)

  const data = {
    labels: [
      'Total Fat',
      'Saturated Fat',
      'Cholesterol',
      'Sodium',
      'Carbohydrates',
      'Fiber',
      'Sugar',
      'Protein',
    ],
    datasets: [
      {
        data: [
          nutritionalAnalysis.fat,
          nutritionalAnalysis.saturatedFat,
          nutritionalAnalysis.cholesterol,
          nutritionalAnalysis.sodium,
          nutritionalAnalysis.carbohydrates,
          nutritionalAnalysis.fiber,
          nutritionalAnalysis.sugar,
          nutritionalAnalysis.protein,
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8F36EB',
          '#36EBD1',
          '#EB8F36',
          '#EB3636',
          '#36EB81',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8F36EB',
          '#36EBD1',
          '#EB8F36',
          '#EB3636',
          '#36EB81',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset) {
              const value = context.dataset.data[context.dataIndex];
              return `${context.label}: ${value}mg`;
            }
            return '';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (in mg)',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container">
      <h1 className="nutrition-title">Nutrition Chart</h1>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      <div className="calories-card">
        <p>Calories: {nutritionalAnalysis.calories}</p>
      </div>
    </div>
  );
};

export default NutritionPage;
