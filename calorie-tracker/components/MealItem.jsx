import React from 'react';
import { Trash2 } from 'lucide-react';

export default function MealItem({ meal, removeMeal }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className={`px-2 py-1 rounded ${meal.mealType === 'breakfast' ? 'bg-orange-200' : meal.mealType === 'lunch' ? 'bg-green-200' : meal.mealType === 'dinner' ? 'bg-blue-200' : 'bg-pink-200'}`}>{meal.mealType}</span>
        <div>
          <h3 className="text-md font-semibold">{meal.name}</h3>
          <p className="text-sm text-gray-600">{meal.kcal} kcal</p>
        </div>
      </div>
      <button onClick={() => removeMeal(meal.id)} className="bg-red-500 text-white rounded p-2">
      <Trash2 />
      </button>
    </div>
  );
}
