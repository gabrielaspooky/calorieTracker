import React from 'react';

export default function CalorieDisplay({ calorieGoal, caloriesConsumed, calorieDeficit }) {
  const getTamagotchiMood = () => {
    const percentageConsumed = (caloriesConsumed / calorieGoal) * 100;
    return percentageConsumed < 80 || percentageConsumed > 120 ? "sad" : "happy";
  };

  return (
    <div className="bg-gray-200 p-6 rounded-md shadow-lg text-center">
      <h2 className="text-lg font-bold">Daily Calorie Goal: {calorieGoal} kcal</h2>
      <p>Mood: {getTamagotchiMood()}</p>
      <p>{caloriesConsumed} kcal consumed</p>
      <p>{calorieDeficit >= 0 ? `Remaining: ${calorieDeficit} kcal` : `Exceso: ${-calorieDeficit} kcal`}</p>
    </div>
  );
}
