import React from 'react';
import { Trash2, BananaIcon, Donut, Salad, Sandwich } from 'lucide-react';

// Función para obtener el ícono del tipo de comida
const getMealIcon = (mealType) => {
  switch (mealType) {
    case 'breakfast':
      return <BananaIcon className="mr-1" />;
    case 'lunch':
      return <Sandwich className="mr-1" />;
    case 'dinner':
      return <Salad className="mr-1" />;
    case 'snack':
      return <Donut className="mr-1" />;
    default:
      return null;
  }
};

export default function MealItem({ meal, removeMeal }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className={`flex items-center px-2 py-1 rounded ${meal.mealType === 'breakfast' ? 'bg-orange-200' : meal.mealType === 'lunch' ? 'bg-green-200' : meal.mealType === 'dinner' ? 'bg-blue-200' : 'bg-pink-200'}`}>
          {getMealIcon(meal.mealType)} 
          {meal.mealType} 
        </span>
        <div>
          <h3 className="text-md font-semibold">{meal.name}</h3>
          <p className="text-sm text-gray-600">{meal.kcal} kcal</p>
        </div>
      </div>
      <button onClick={() => removeMeal(meal.id)} className="bg-red-500 text-white rounded p-2 flex items-center">
        <Trash2 className="mr-1" /> 
      </button>
    </div>
  );
}
