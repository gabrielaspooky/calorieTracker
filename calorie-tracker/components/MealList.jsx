import React from 'react';
import MealItem from './MealItem';

export default function MealList({ meals, removeMeal }) {
  return (
    <div className="mt-6 space-y-2">
      {meals.map(meal => (
        <MealItem key={meal.id} meal={meal} removeMeal={removeMeal} />
      ))}
    </div>
  );
}
