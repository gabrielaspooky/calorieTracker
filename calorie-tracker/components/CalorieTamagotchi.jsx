"use client"
import React, { useState, useEffect } from 'react';
import CalorieDisplay from '../components/CalorieDisplay';
import MealDialog from '../components/MealDialog';
import MealList from '../components/MealList';
import Button from "../components/ui/Button"; 


export default function CalorieTamagotchi() {
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    id: "",
    name: "",
    kcal: 0,
    mealType: "breakfast",
    tags: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Datos de ejemplo
    const exampleData = [
      { id: "1", name: "Desayuno", kcal: 408, mealType: "breakfast" },
      { id: "2", name: "Almuerzo", kcal: 654, mealType: "lunch" },
      { id: "3", name: "Cena", kcal: 1108, mealType: "dinner" },
    ];
    setMeals(exampleData);
  }, []);

  const caloriesConsumed = meals.reduce((sum, meal) => sum + meal.kcal, 0);
  const calorieDeficit = calorieGoal - caloriesConsumed;

  const addMeal = () => {
    if (newMeal.name && newMeal.kcal > 0) {
      setMeals([...meals, { ...newMeal, id: Date.now().toString() }]);
      setNewMeal({ id: "", name: "", kcal: 0, mealType: "breakfast", tags: [] });
      setIsDialogOpen(false);
    }
  };

  const removeMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-200 to-purple-200">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-96 border-8 border-gray-700">
        <div className="bg-green-200 p-4 rounded-2xl mb-4 shadow-inner">
          <div className="flex justify-center items-center mb-4">
            <img
              src="https://i.redd.it/iq2e3gbl75va1.gif"
              alt="Tamagotchi"
              className="w-40 h-40 rounded-full border-4 border-gray-700 shadow-lg"
            />
          </div>
          <CalorieDisplay calorieGoal={calorieGoal} caloriesConsumed={caloriesConsumed} calorieDeficit={calorieDeficit} />
        </div>
        <div className="flex justify-center mb-4">
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Añadir comida
          </Button>
        </div>
        <MealDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          newMeal={newMeal}
          setNewMeal={setNewMeal}
          addMeal={addMeal}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
        />
        <div className="bg-gray-700 p-4 rounded-2xl mb-4 shadow-inner">
          <MealList meals={meals} removeMeal={removeMeal} />
        </div>
        <div className="mt-4">
          <label className="block text-white mb-2">Objetivo diario de calorias</label>
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(Number(e.target.value) || 1400)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-full py-2 px-4 focus:outline-none focus:border-yellow-400 transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}