"use client"
import React, { useState, useEffect } from 'react';
import CalorieDisplay from '../components/CalorieDisplay';
import MealDialog from '../components/MealDialog';
import MealList from '../components/MealList';
import Button from "../components/ui/Button"; 

export default function CalorieTamagotchi() {
  const [calorieGoal, setCalorieGoal] = useState(1400);
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
    <div className="flex justify-center items-center min-h-screen bg-[#8bac0f] p-4">
      <div className="bg-[#0f380f] p-8 rounded-3xl shadow-2xl w-full max-w-md border-8 border-[#306230]">
        <div className="bg-[#d4d8c0c1] p-4 rounded-2xl mb-4 shadow-inner border-4 border-[#306230]">
          <div className="flex justify-center items-center mb-4">
            <img
              src="https://i.redd.it/iq2e3gbl75va1.gif"
              alt="Tamagotchi"
              className="w-32 h-32 rounded-lg border-4 border-[#224222] shadow-lg"
            />
          </div>
          <div className="mt-4">
            <label className="block text-[#0f380f] mb-2 font-bold">Objetivo diario de calorias</label>
            <input
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(Number(e.target.value) || 1400)}
              className="w-full bg-[#8bac0f] text-[#0f380f] border-2 border-[#306230] rounded-lg py-2 px-4 focus:outline-none focus:border-[#0f380f] transition duration-300 ease-in-out"
            />
          </div>
          <CalorieDisplay calorieGoal={calorieGoal} caloriesConsumed={caloriesConsumed} calorieDeficit={calorieDeficit} />
        </div>
        <div className="flex justify-center mb-4">
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#8bac0f] hover:bg-[#9bbc0f] text-[#0f380f] font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 border-2 border-[#306230]"
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
        <div className="bg-[#9bbc0f] p-4 rounded-2xl mb-4 shadow-inner border-4 border-[#306230]">
          <MealList meals={meals} removeMeal={removeMeal} />
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="w-3 h-12 bg-[#4cb14c] rounded-full"></div>
          <div className="w-3 h-12 bg-[#4cb14c] rounded-full"></div>
          <div className="w-12 h-3 bg-[#4cb14c] rounded-full"></div>
          <div className="w-12 h-3 bg-[#4cb14c] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}