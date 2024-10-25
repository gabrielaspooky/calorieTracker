import React from 'react';

export default function CalorieDisplay({ calorieGoal, caloriesConsumed, calorieDeficit }) {
  const getTamagotchiMood = () => {
    const percentageConsumed = (caloriesConsumed / calorieGoal) * 100;
    return percentageConsumed < 80 || percentageConsumed > 120 ? "neutral" : "happy :)";
  };

  return (
    <div className="bg-gray-200 p-6 rounded-md shadow-lg text-center">
      <h2 className="text-md font-semibold whitespace-nowrap">Trackeador diario de calorías
        <br />
        {calorieGoal} kcal</h2>
      <p>Mood: {getTamagotchiMood()}</p>
      <b>{caloriesConsumed} kcal consumidas</b>
      <p>{calorieDeficit >= 0 ? `Pendientes: ${calorieDeficit} kcal` : `Exceso: ${-calorieDeficit} kcal`}</p>
    </div>
  );
}
